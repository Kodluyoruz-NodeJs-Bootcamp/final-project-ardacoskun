import express, { Request, Response } from "express";
import passport from "passport";
import { generateJwtToken } from "../config/passport";
import { User } from "../entity/User";
import { IUser } from "../interfaces/user.interface";

express.Router();

export const facebookRouter = passport.authenticate("facebook", {
  failureRedirect: "/signin",
});

export const googleRouter = passport.authenticate("google", {
  failureRedirect: "/signin",
});

export const createUser = async (req: Request, res: Response) => {
  let { fullName, email, password }: IUser = req.body;
  try {
    const oldUser = await User.findOne({ email });
    console.log("old user", oldUser);

    //This pile checks if user created an account with google or facebook before than if it is true redirect to user create password page so user can create a new passsword for local login.
    if (oldUser && !oldUser.password) {
      return res.redirect("/create-password");
    } else if (oldUser && oldUser.password) {
      return res.redirect("/signin");
    }

    //Create user with local provider
    let user = new User();
    user.fullName = fullName;
    user.email = email;
    user.password = password;
    user.provider = "local";

    await user.save();
    const token = generateJwtToken(user);

    //Send cookie
    res.cookie("jwt", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).redirect("/movies");
  } catch (error) {
    console.log("createUser hatası ");
    throw new Error(error as string);
  }
};
