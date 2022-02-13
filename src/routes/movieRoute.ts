import express from "express";

import {
  createComment,
  createMovie,
  deleteComment,
  deleteLike,
  deleteMovie,
  getMovies,
  likeMovie,
  updateMovie,
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

//Like to Movie
router.get("/movies/like/:id/:src", authCheck, likeMovie);

//Delete like from Movie
router.delete("/movies/delete-like/:id/:src/", authCheck, deleteLike);

//UpdateMovie
router.put("/movies/update/:id/", authCheck, updateMovie);

//Delete Movie
router.delete("/movies/delete/:id/", authCheck, deleteMovie);

export default router;
