import express from "express";

import {
  createComment,
  createMovie,
  deleteComment,
  getMovies,
} from "../controllers/movie.controller";
import { authCheck } from "../middlewares/profileMiddleware";

const router = express.Router();
//Create New Movie
router.post("/createMovie", authCheck, createMovie);

//Get Published Movies
router.get("/movies", authCheck, getMovies);

//Add comment to Movie
router.post("/movies/:id", authCheck, createComment);

router.delete("/movies/delete-comment/:id/:movieId/", authCheck, deleteComment);

export default router;
