import keys from "./keys";

export default {
  facebookOptions: {
    // options for facebook strategy
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "/auth/facebook/redirect",
    profileFields: ["id", "displayName", "email", "picture"],
  },
  googleOptions: {
    // options for google strategy
    callbackURL: "/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
  },
};
