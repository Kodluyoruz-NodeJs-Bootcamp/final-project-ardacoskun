import express, { Request, Response } from "express";
import passport from "passport";

express.Router();

export const facebookRouter = passport.authenticate("facebook", {
  failureRedirect: "/signin",
});

export const googleRouter = passport.authenticate("google", {
  failureRedirect: "/signin",
});
