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
  } catch (error) {
    throw new Error(error);
  }
};
