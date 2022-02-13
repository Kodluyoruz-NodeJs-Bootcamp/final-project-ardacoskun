import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import passport from "passport";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute";
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

//Middlewares
app.set("view engine", "ejs");

//Routes

app.use("/auth");

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥🔥 Server is listening on port ${PORT} 🔥🔥🔥`);
});
