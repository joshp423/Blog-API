import bcrypt from "bcryptjs";
import { body, validationResult, matchedData } from "express-validator";
import prisma from "../lib/prisma.js";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import z from "zod";

const emailLengthErr = "must be between 1 and 50 characters";
const lengthErrShort = "must be between 1 and 25 characters";
const passwordAlphaNumericErr = "must contain at least a letter and a number";

const userSchema = z.object({
  //parses the object to the schema, narrowing the types that are allowed
  username: z.string(),
  password: z.string(),
});

const createPostBodySchema = z.object({
  //parses the object to the schema, narrowing the types that are allowed
  title: z.string(),
  text: z.string(),
  published: z.boolean()
});

const editPostBodySchema = z.object({
  //parses the object to the schema, narrowing the types that are allowed
  id: z.int(),
  title: z.string(),
  text: z.string(),
})

const createCommentBodySchema = z.object({
  //parses the object to the schema, narrowing the types that are allowed
  text: z.string(),
  userid: z.int(),
  postid: z.int(),
})

const validateSignUp = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 25 })
    .withMessage(`Email: ${emailLengthErr}`),
  body("password")
    .trim()
    .isLength({ min: 1, max: 25 })
    .withMessage(`Password: ${lengthErrShort}`)
    .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/) //regular expression for contains a letter and a number
    .withMessage(`Password: ${passwordAlphaNumericErr}`),
];

export const signUp = [
  ...validateSignUp,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
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


export async function logInView(req: Request, res: Response, next: NextFunction) {

  const user = {
    username: req.body["username"],
    password: req.body["password"],
  };

  const parsedUser = userSchema.parse(user);

  if (typeof parsedUser.username != "string") {
    return res.status(400).json({ message: "Incorrect header" });
  }

  try {
    const userCheck = await prisma.user.findUnique({
      where: {
        username: parsedUser.username,
      },
    });

    if (!userCheck) {
      return res.status(400).json({ message: "Incorrect username" });
    }

    const match = await bcrypt.compare(parsedUser.password, userCheck.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    jwt.sign({ user }, "secretKey", { expiresIn: "30s" }, function(err, token) {
      if (err || !token) {
        //need to account for an error or no token
        return res.status(500).json({ message: "Token generation failed" });
      }
      return res.json({ token }).json({ message: "succesfully logged in" }).json({ userCheck });
    });
  } catch (err) {
    res.sendStatus(500);
    return err;
  }
}

export async function logInEdit(req: Request, res: Response, next: NextFunction) {

  const user = {
    username: req.body["username"],
    password: req.body["password"],
  };

  const parsedUser = userSchema.parse(user);

  if (typeof parsedUser.username != "string") {
    return res.status(400).json({ message: "Incorrect header" });
  }

  try {
    const userCheck = await prisma.user.findUnique({
      where: {
        username: parsedUser.username,
      },
    });

    if (!userCheck) {
      return res.status(400).json({ message: "Incorrect username" });
    }

    const match = await bcrypt.compare(parsedUser.password, userCheck.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    

    if (!userCheck.editor) {
      return res.status(401).json({ message: "Unauthorised to edit" });
    }

    jwt.sign({ user }, "secretKey", { expiresIn: "30s" }, function(err, token) {
      if (err || !token) {
        //need to account for an error or no token
        return res.status(500).json({ message: "Token generation failed" });
      }
      return res.json({ token }).json({ message: "succesfully logged in" }).json({ userCheck });;
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

export async function getAllBlogPosts(
  req: Request,
  res: Response,
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

export async function getSelectedBlogPost(
  req: Request,
  res: Response,
) {
  const blogPost = await prisma.posts.findUnique({
    where: {
      id: Number(req.body["blogpostId"]),
    },
  });
  res.json({
    blogPost,
  });
  return;
}

export async function createNewBlogPost(
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
    return res.status(400).json({ error });
  }
}

export async function editSelectedBlogPost(
  req: Request,
  res: Response,
) {
  try {
    
    const { id, title, text } = editPostBodySchema.parse(req.body)

    const updatedPost = await prisma.posts.update({
      where: { id },
      data: {
        title,
        text,
      },
    });

  return res.status(201).json(updatedPost);

  } catch (error) {
    return res.status(400).json({ error });
  }
}

export async function togglePublishSelectedBlogPost(
  req: Request,
  res: Response,
) {
  try {
    
    const id = Number(req.body['id'])

    const selectedPost = await prisma.posts.findUnique({
      where: {
        id: Number(req.body["id"]),
      },
    });

    let updatedPost = null;

    if (selectedPost?.published) {
      updatedPost = await prisma.posts.update({
        where: { id },
        data: {
          published: false
        },
      });
    }
    else {
      updatedPost = await prisma.posts.update({
        where: { id },
        data: {
          published: true
        },
      });
    }
    return res.status(201).json(updatedPost);

  } catch (error) {
    return res.status(400).json({ error });
  }
}



export async function deleteSelectedBlogPost(
  req: Request,
  res: Response,
) {
  try {
    
    const id = Number(req.body['id'])

    if (!id) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const deletedPost = await prisma.posts.delete({where: { id } });

    return res.status(200).json(deletedPost);

  } catch (error) {
    return res.status(400).json({ error });
  }
}


export async function getAllComments (
  req: Request,
  res: Response,
) {

  const { postid } = createCommentBodySchema.parse(req.body)

  const comments = await prisma.comments.findMany({
    where: { postid },
    orderBy: {
      id: "desc",
    },
  });
  res.json({
    comments,
  });
  return;
}

export async function createNewComment(
  req: Request,
  res: Response,
) {
  try {
    
    const { text, userid, postid } = createCommentBodySchema.parse(req.body)

    if (!postid || !text) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const comment = await prisma.comments.create({
      data: {
        text,
        userid,
        postid,
        timeposted: new Date(),
      },
    });

    return res.status(201).json( comment );

  } catch (error) {
    return res.status(400).json({ error });
  }
}
