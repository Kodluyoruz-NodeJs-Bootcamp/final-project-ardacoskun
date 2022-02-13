import express, { Request, Response } from "express";
import passport from "passport";
import { generateJwtToken } from "../config/passport";
import { User } from "../entity/User";
import { IUser } from "../interfaces/user.interface";

express.Router();

// auth logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

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

    //Call password hashing function from User model.
    await user.hashPassword();
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

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const oldUser = await User.findOne({ email });
  console.log("old user", oldUser);

  if (oldUser && oldUser.password === null) {
    return res.redirect("/create-password");
  }

  //Get current browser info
  const userAgent = req.headers["user-agent"] as string;

  let user = new User();

  try {
    //Call login and create token functions from User model

    const loggedIn = await user.findByCredentials(email, password);
    const token = generateJwtToken(loggedIn);

    //send cookie
    res.cookie("jwt", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).redirect("/movies");
  } catch (error) {
    console.log("error", error);
    res.render("signin", { errors: error });
  }
};

//Create password to local login if user signed up with google or facebook before.
export const choosePassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const isUser = await User.findOne({ email });
  try {
    isUser.password = password;
    isUser.hashPassword();
    await isUser.save();

    return res.status(200).redirect("/signin");
  } catch (error) {
    throw new Error(error as string);
  }
};
