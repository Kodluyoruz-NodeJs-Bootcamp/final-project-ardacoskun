import { NextFunction, Request, Response } from "express";

//This middleware checks user logged in or not and if user logged in prevent to get back signup or signin.

export const loggedinCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = await req.cookies.jwt;

  if (token) return res.redirect("/");

  next();
};
