import bcrypt from "bcryptjs";
import { body, validationResult, matchedData } from "express-validator";
import prisma from "../lib/prisma.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {Strategy as JWTStrategy} from "passport-jwt";
import {ExtractJwt as ExtractJwt} from "passport-jwt";

const emailLengthErr = "must be between 1 and 50 characters";
const lengthErrShort = "must be between 1 and 25 characters";
const passwordAlphaNumericErr = "must contain at least a letter and a number";

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

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(
  new JWTStrategy(opts function(jwt_payload, done) {

    User.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
    })
    // try {
    //   const user = await prisma.user.findUnique({
    //     where: {
    //       username: username,
    //     },
    //   });

    //   if (!user) {
    //     return done(null, false, { message: "Incorrect username" });
    //   }

    //   const match = await bcrypt.compare(password, user.password);
    //   if (!match) {
    //     // passwords do not match!
    //     return done(null, false, { message: "Incorrect password" });
    //   }
    //   return done(null, user);
    // } catch (err) {
    //   return done(err);
    // }
  }),
);


export const signUp = [
    ...validateSignUp,
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.sendStatus(400)
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
          res.json({
            message: 'Successful Sign-Up'
          });
        } catch (error) {
          console.error(error);
          next(error);
        }
    },
];

export async function logIn (req: Request, res: Response, next: NextFunction) {

  const user = {
    id: req.headers['id'],
    username: req.headers['username'],
    password: req.headers['password'],
  }

  jwt.sign({user}, 'secretKey', {expiresIn: '30s'}, (err, token) => {
    res.json({
      token
    });
  });

};

function verifyToken(req: Request, res: Response, next: NextFunction) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

export async function blogPostsGet (req: Request, res: Response, next: NextFunction) {
  const blogPosts = await prisma.posts.findMany({
    orderBy: {
      id: "desc",
    }
  });
  res.json({
    blogPosts
  })
  return;
}

export async function blogPostsPost (req: Request, res: Response, next: NextFunction) {
  // get json from FE with details and put in that way?
  // await prisma.posts.create({
  //   data: {
  //     Title: req.params.title,
  //     Text:
  //   }
  // })
}
