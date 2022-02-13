import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../entity/User";

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = await req.cookies.jwt;

    if (!token) {
      res.status(401).redirect("/signin");
    } else {
      const decoded = jwt.verify(token, "arda123") as JwtPayload;

      const user = await User.findOne({ id: decoded.id });

      req.user = user;

      next();
    }
  } catch (error) {
    console.log(error);
    console.log("profileROuter hatası ");
    throw new Error(error);
  }
};
