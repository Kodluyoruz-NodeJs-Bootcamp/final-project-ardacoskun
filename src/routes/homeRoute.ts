import express from "express";
import {
  choosePassword,
  createUser,
  loginUser,
} from "../controllers/auth.controller";
import {
  getMoviePage,
  getMovieUpdatePage,
  getStarsPage,
  getStarUpdatePage,
  localRegister,
  localSignIn,
} from "../controllers/home.controller";
import { loggedinCheck } from "../middlewares/loggedinCheck";
import { authCheck } from "../middlewares/profileMiddleware";
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

//Get single movie page
router.get("/movies/:id", authCheck, getMoviePage);

// Movie Update Page Render
router.get("/movies/update/:id", authCheck, getMovieUpdatePage);

//Get single star page
router.get("/stars/:id", authCheck, getStarsPage);

// Star Update Page Render
router.get("/stars/update/:id", authCheck, getStarUpdatePage);

export default router;
