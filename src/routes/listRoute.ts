import express from "express";
import {
  getMyCommentedMoviesPage,
  getMyCommentedStarsPage,
  getMyLikedMoviesPage,
  getMyLikedStarsPage,
  getMyListsPage,
  getMyStarsPage,
} from "../controllers/list.controller";
import { authCheck } from "../middlewares/profileMiddleware";

const router = express.Router();

//Get current users movies
router.get("/", authCheck, getMyListsPage);

//Get current users liked movies
router.get("/liked-movies", authCheck, getMyLikedMoviesPage);

//Get current users commented movies
router.get("/commented-movies", authCheck, getMyCommentedMoviesPage);

//Get current users stars
router.get("/stars", authCheck, getMyStarsPage);

//Get current users liked stars
router.get("/liked-stars", authCheck, getMyLikedStarsPage);

//Get current users commented stars
router.get("/commented-stars", authCheck, getMyCommentedStarsPage);

export default router;
