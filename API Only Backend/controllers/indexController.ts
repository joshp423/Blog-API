import bcrypt from "bcryptjs";
import { body, validationResult, matchedData } from "express-validator";
import prisma from "../lib/prisma.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import type { Request, Response, NextFunction } from 'express';

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


passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);


export const signUpPost = [
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
