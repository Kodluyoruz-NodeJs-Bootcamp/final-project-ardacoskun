import express from "express";
import {
  getMyCommentedMoviesPage,
  getMyLikedMoviesPage,
  getMyListsPage,
} from "../controllers/list.controller";
import { authCheck } from "../middlewares/profileMiddleware";

const router = express.Router();

//Get current users movies
router.get("/", authCheck, getMyListsPage);

//Get current users liked movies
router.get("/liked-movies", authCheck, getMyLikedMoviesPage);

//Get current users commented movies
router.get("/commented-movies", authCheck, getMyCommentedMoviesPage);
