import { Request, Response } from "express";
import { User } from "../entity/User";
import { IMovie } from "../interfaces/movie.interface";
import * as fs from "fs";
import { Movie } from "../entity/Movies";

//Create a new movie
export const createMovie = async (req: Request, res: Response) => {
  let { movieName, movieDescription, published, movieTag }: IMovie = req.body;

  const user = req.user as User;
  try {
    const uploadDir = "public/uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const imageName = req.files?.image["name"];
    const image = req.files?.image["data"];

    const currentUser = await User.findOne({ id: user.id });

    published ? (published = true) : (published = false);

    let imageurl: string;

    if (image === undefined) {
      imageurl = "/uploads/noimage.jpg";
    } else {
      fs.writeFileSync(uploadDir + "/" + imageName, image);
      imageurl = "/uploads/" + imageName;
    }

    const movie = Movie.create({
      name: movieName,
      description: movieDescription,
      tag: movieTag,
      published,
      image: imageurl,
      user: currentUser,
    });

    await Movie.save(movie);

    return res.status(201).redirect("/movies");
  } catch (error) {
    throw new Error(error as string);
  }
};
