import passport from "passport";
import JWTStrategy from "passport-jwt";

// This is the strategy setup for JWT so that we can use tokens instead of sessions.
passport.use(
  new JWTStrategy.Strategy(
    {
      jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies.jwt;
        }
        return token;
      },
      secretOrKey: "arda123",
    },
    (jwtPayload, done) => {
      if (!jwtPayload) {
        return done("No token found...");
      }
      return done(null, jwtPayload);
    }
  )
);
