import express from "express";

import { createMovie } from "../controllers/movie.controller";
import { authCheck } from "../middlewares/profileMiddleware";

const router = express.Router();
//Create New Movie
router.post("/createMovie", authCheck, createMovie);

export default router;
