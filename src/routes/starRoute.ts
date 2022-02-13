import express from "express";
import { createStar, getStars } from "../controllers/star.controller";
import { authCheck } from "../middlewares/profileMiddleware";

const router = express.Router();

//Get Published Stars
router.get("/stars", authCheck, getStars);

//Create New Star
router.post("/createStar", authCheck, createStar);

export default router;
