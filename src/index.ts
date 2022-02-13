import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import passport from "passport";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import authRoute from "./routes/authRoute";
import homeRoute from "./routes/homeRoute";
import movieRoute from "./routes/movieRoute";
import starRoute from "./routes/starRoute";
import listRoute from "./routes/listRoute";
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
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(fileUpload());

//Middlewares
app.set("view engine", "ejs");

//Routes

app.use("/auth", authRoute);
app.use(homeRoute);
app.use(movieRoute);
app.use(starRoute);
app.use("/mylists", listRoute);

app.get("/", authCheck, (req: Request, res: Response) => {
  res.redirect("/movies");
});

//404 Page route
app.get("*", function (req: Request, res: Response) {
  res.status(404).render("404");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥🔥 Server is listening on port ${PORT} 🔥🔥🔥`);
});
