import express from "express";
import { localRegister, localSignIn } from "../controllers/home.controller";
import { loggedinCheck } from "../middlewares/loggedinCheck";

const router = express.Router();

router.get("/signup", loggedinCheck, localRegister);

router.get("/signin", loggedinCheck, localSignIn);
