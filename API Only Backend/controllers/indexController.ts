import bcrypt from "bcryptjs";
import { body, validationResult, matchedData } from "express-validator";
import prisma from "../lib/prisma.js";
import passport from "passport";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt as ExtractJwt } from "passport-jwt";
import z from "zod";

const emailLengthErr = "must be between 1 and 50 characters";
const lengthErrShort = "must be between 1 and 25 characters";
const passwordAlphaNumericErr = "must contain at least a letter and a number";

const userSchema = z.object({
  //parses the object to the schema, narrowing the types that are allowed
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

const createPostBodySchema = z.object({
  //parses the object to the schema, narrowing the types that are allowed
  title: z.string(),
  text: z.string(),
  published: z.boolean()
});

const validateSignUp = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(`Email: ${emailLengthErr}`),
  body("password")
    .trim()
    .isLength({ min: 1, max: 25 })
    .withMessage(`Password: ${lengthErrShort}`)
    .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/) //regular expression for contains a letter and a number
    .withMessage(`Password: ${passwordAlphaNumericErr}`),
];

// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';

// passport.use(
//   new JWTStrategy(opts function(jwt_payload, done) {

//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//         // or you could create a new account
//     })

//   }),
// );

export const signUp = [
  ...validateSignUp,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.sendStatus(400);
    }
    const { username, password } = matchedData(req);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      return res.status(201).json({ message: "Successful Sign-Up" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];


export async function logIn(req: Request, res: Response, next: NextFunction) {


  const user = {
    id: req.headers["id"],
    username: req.headers["username"],
    password: req.headers["password"],
  };

  const parsedUser = userSchema.parse(user);

  if (typeof parsedUser.username != "string") {
    res.sendStatus(400);
    return res.json({ message: "Incorrect header" });
  }

  try {
    const userCheck = await prisma.user.findUnique({
      where: {
        username: parsedUser.username,
      },
    });

    if (!userCheck) {
      res.sendStatus(400);
      return res.json({ message: "Incorrect username" });
    }

    const match = await bcrypt.compare(parsedUser.password, userCheck.password);
    if (!match) {
      res.sendStatus(400);
      res.json({ message: "Incorrect password" });
    }
    res.json({ message: "succesfully logged in" });
    jwt.sign({ user }, "secretKey", { expiresIn: "30s" }, (err, token) => {
      if (err || !token) {
        //need to account for an error or no token
        return res.status(500).json({ message: "Token generation failed" });
      }
      res.json({ token });
    });
  } catch (err) {
    res.sendStatus(500);
    return err;
  }
}

interface AuthRequest extends Request {
  token?: string;
}
export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];

    if (!bearerToken) {
      return res.status(403);
    }
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

export async function blogPostsGet(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const blogPosts = await prisma.posts.findMany({
    orderBy: {
      id: "desc",
    },
  });
  res.json({
    blogPosts,
  });
  return;
}

export async function blogPostGet(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const blogPost = await prisma.posts.findUnique({
    where: {
      id: Number(req.headers["blogpostId"]),
    },
  });
  res.json({
    blogPost,
  });
  return;
}


export async function blogPostsPost(
  req: Request,
  res: Response,
) {
  try {
    
    const { title, text, published } = createPostBodySchema.parse(req.body)

    if (!title || !text) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const post = await prisma.posts.create({
      data: {
        title,
        text,
        published,
        timeposted: new Date(),
      },
    });

  return res.status(201).json(post);
  } catch (error) {
    return res.status(400).json({ message: "Invalid input" });
  }
}
