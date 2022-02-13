import { Request, Response } from "express";

export const googleRedirect = (req: Request, res: Response) => {
  console.log("google", req.user);

  res.redirect("/");
};

export const facebookRedirect = (req: Request, res: Response) => {
  console.log("facebook", req.user);

  res.redirect("/");
};
