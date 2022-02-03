import express, { Request, Response } from "express";

const app = express();

//Middlewares
app.set("view engine", "ejs");

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
