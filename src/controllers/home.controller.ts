import { Request, Response } from "express";

export const localRegister = (req: Request, res: Response) => {
  res.status(200).render("signup");
};

export const localSignIn = (req: Request, res: Response) => {
  res.status(200).render("signin");
};

export const getChangePassword = (req: Request, res: Response) => {
  res.status(200).render("createPassword");
};
