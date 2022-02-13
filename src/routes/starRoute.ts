import express from "express";
import {
  createComment,
  createStar,
  deleteComment,
  getStars,
} from "../controllers/star.controller";
import { authCheck } from "../middlewares/profileMiddleware";

const router = express.Router();

//Get Published Stars
router.get("/stars", authCheck, getStars);

//Create New Star
router.post("/createStar", authCheck, createStar);

//Add comment to Star
router.post("/stars/:id", authCheck, createComment);

//Delete comment from Star

router.delete("/stars/delete-comment/:id/:starId/", authCheck, deleteComment);

export default router;
