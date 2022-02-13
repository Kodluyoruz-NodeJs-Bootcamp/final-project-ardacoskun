import { User } from "../entity/User";

export //Google Auth Callback Function
const verifyGoogleCallback = async (
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
): Promise<any> => {
  try {
    // passport callback function

    User.findOne({ email: profile._json.email }).then((currentUser) => {
      if (currentUser) {
        console.log("user is", currentUser);
        done(null, currentUser);
      } else {
        const user = new User();
        user.fullName = profile.displayName;
        user.email = profile._json.email;
        user.googleId = profile.id;
        user.thumbnail = profile._json.picture;
        user.provider = profile.provider;

        user.save().then((newUser) => {
          console.log("New User:", newUser);
          done(null, newUser);
        });
      }
    });

    console.log("passport callback is fired");
  } catch (error) {
    throw new Error(error);
  }
};

//Facebook Auth Callback Function
export const verifyFacebookCallback = async (
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
): Promise<any> => {
  try {
    // passport callback function

    User.findOne({ email: profile._json.email }).then((currentUser) => {
      if (currentUser) {
        console.log("user is", currentUser);
        done(null, currentUser);
      } else {
        const user = new User();
        user.fullName = profile.displayName;
        user.email = profile._json.email;
        user.facebookId = profile.id;
        user.thumbnail = profile.photos[0].value;
        user.provider = profile.provider;

        user.save().then((newUser) => {
          console.log("New User:", newUser);
          done(null, newUser);
        });
      }
    });

    console.log("passport callback is fired");
  } catch (error) {
    throw new Error(error);
  }
};
