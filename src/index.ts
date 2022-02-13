import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import passport from "passport";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute";
import homeRoute from "./routes/homeRoute";
import movieRoute from "./routes/movieRoute";
import { authCheck } from "./middlewares/profileMiddleware";

createConnection();
const app = express();

//Template Engine
app.set("view engine", "ejs");

//Middlewares
//-----------------------------

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(fileUpload());

//Middlewares
app.set("view engine", "ejs");

//Routes

app.use("/auth", authRoute);
app.use(homeRoute);
app.use(movieRoute);

app.get("/", authCheck, (req: Request, res: Response) => {
  res.redirect("/movies");
});
app.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥🔥 Server is listening on port ${PORT} 🔥🔥🔥`);
});
