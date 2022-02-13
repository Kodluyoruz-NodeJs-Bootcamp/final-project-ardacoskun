import { Request, Response } from "express";
import { generateJwtToken } from "../config/passport";

export const googleRedirect = (req: Request, res: Response) => {
  console.log("google", req.user);
  const token = generateJwtToken(req.user);
  res.cookie("jwt", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.redirect("/");
};

export const facebookRedirect = (req: Request, res: Response) => {
  console.log("facebook", req.user);
  const token = generateJwtToken(req.user);
  res.cookie("jwt", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.redirect("/");
};
