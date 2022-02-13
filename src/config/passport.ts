import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import FacebookStrategy from "passport-facebook";
import strategyOptions from "./strategyOptions";
import { User } from "../entity/User";
import {
  verifyFacebookCallback,
  verifyGoogleCallback,
} from "../middlewares/passportCallbacks";
const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
  User.findOne({ id }).then((user) => {
    done(null, user);
  });
});

//Strategy of Google Auth
passport.use(
  new GoogleStrategy(strategyOptions.googleOptions, verifyGoogleCallback)
);

//Strategy of Facebook Auth
passport.use(
  new FacebookStrategy.Strategy(
    strategyOptions.facebookOptions,
    verifyFacebookCallback
  )
);
