import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { User } from "../entity/User";

//select inputs name and validate according to conditions for register form
export const registerValidator = [
  check("fullName", "Name must be at least 3 characters long.")
    .notEmpty()
    .isLength({ min: 3 }),
  check("email")
    .trim()
    .isEmail()
    .withMessage("Please insert a valid email address!"),
  check("password", "Password must be at least 5 characters long.")
    .notEmpty()
    .isLength({ min: 5 }),
];

export const checkRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: Array<String> = validationResult(req)
    .array()
    .map((error) => error.msg);
  res.locals.errors = errors;

  const isUser = await User.findOne({ email: req.body.email });

  if (isUser) {
    errors.push("Email already exists.");
  }

  errors.length > 0 ? res.render("signup", { errors }) : next();
};

export const loginValidator = [
  check("email", "Email is required.").trim().notEmpty(),
  check("password", "Password is required").trim().notEmpty(),
];

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const errors: Array<String> = validationResult(req)
    .array()
    .map((error) => error.msg);
  res.locals.errors = errors;

  errors.length > 0 ? res.render("signin", { errors }) : next();
};

export const changePasswordValidator = [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Please insert a valid email address!"),
  check("password", "Password must be at least 5 characters long.")
    .notEmpty()
    .isLength({ min: 5 }),
];

export const checkChangePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: Array<String> = validationResult(req)
    .array()
    .map((error) => error.msg);
  res.locals.errors = errors;

  const isUser = await User.findOne({ email: req.body.email });

  if (!isUser) {
    errors.push("Please create an account first.");
  }

  errors.length > 0 ? res.render("createPassword", { errors }) : next();
};
