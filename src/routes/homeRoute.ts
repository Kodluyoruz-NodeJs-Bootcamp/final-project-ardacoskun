import express from "express";
import {
  choosePassword,
  createUser,
  loginUser,
} from "../controllers/auth.controller";
import { localRegister, localSignIn } from "../controllers/home.controller";
import { loggedinCheck } from "../middlewares/loggedinCheck";
import {
  changePasswordValidator,
  checkChangePassword,
  checkLogin,
  checkRegister,
  loginValidator,
  registerValidator,
} from "../middlewares/validationMiddleware";

const router = express.Router();

router.get("/signup", loggedinCheck, localRegister);

router.get("/signin", loggedinCheck, localSignIn);

router.get("/create-password", loggedinCheck);

router.post("/signup", registerValidator, checkRegister, createUser);

router.post("/signin", loginValidator, checkLogin, loginUser);

router.post(
  "/create-password",
  changePasswordValidator,
  checkChangePassword,
  choosePassword
);

export default router;
