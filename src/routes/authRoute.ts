import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import {
  facebookRouter,
  googleRouter,
  logout,
} from "../controllers/auth.controller";
import {
  facebookRedirect,
  googleRedirect,
} from "../middlewares/authMiddleware";

const router = express.Router();

bodyParser.urlencoded({ extended: false });

// auth logout
router.get("/logout", logout);

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// This is the route for initiating the OAuth flow to Facebook
router.get("/facebook", passport.authenticate("facebook", { scope: "email" }));

// This is the callback\redirect url after the OAuth login at Facebook.
router.get("/facebook/redirect", facebookRouter, facebookRedirect);

router.get("/google/redirect", googleRouter, googleRedirect);

export default router;
