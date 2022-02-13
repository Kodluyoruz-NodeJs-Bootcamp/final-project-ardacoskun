import express from "express";
import {
  createComment,
  createStar,
  deleteComment,
  deleteLike,
  deleteStar,
  getStars,
  likeStar,
  updateStar,
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

router.get("/stars/like/:id/:src", authCheck, likeStar);

router.delete("/stars/delete-like/:id/:src/", authCheck, deleteLike);

//UpdateStar
router.put("/stars/update/:id/", authCheck, updateStar);

//Delete Star
router.delete("/stars/delete/:id/", authCheck, deleteStar);

export default router;
