import { Request, Response } from "express";
import { MovieLikes } from "../entity/MovieLikes";
import { Movie } from "../entity/Movies";
import { User } from "../entity/User";

export const localRegister = (req: Request, res: Response) => {
  res.status(200).render("signup");
};

export const localSignIn = (req: Request, res: Response) => {
  res.status(200).render("signin");
};

export const getChangePassword = (req: Request, res: Response) => {
  res.status(200).render("createPassword");
};

//Get single movie page
export const getMoviePage = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    const currentUser = await User.findOne({ id: user.id });

    const movie = await Movie.createQueryBuilder("movies")
      .leftJoinAndSelect("movies.user", "user")
      .leftJoinAndSelect("movies.comments", "comments.text")
      .leftJoinAndSelect("movies.likes", "likes")
      .where("movies.id=:movieId", { movieId: req.params.id })
      .getOne();

    if (!movie) return res.render("404", { title: "movie" });

    const userLikes = await MovieLikes.createQueryBuilder("movie_likes")
      .leftJoinAndSelect("movie_likes.movie", "movie")
      .where("movie_likes.owner=:userId", { userId: user.id })
      .getMany();

    const myLikes = [];
    for (let i = 0; i < userLikes.length; i++) {
      myLikes.push(userLikes[i].movie.id);
    }

    res.status(200).render("singleMovie", { movie, currentUser, myLikes });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Update Page Render
export const getMovieUpdatePage = async (req: Request, res: Response) => {
  const movieId = Number(req.params.id);
  const user = req.user as User;
  try {
    const movie = await Movie.createQueryBuilder("movies")
      .leftJoinAndSelect("movies.user", "user")
      .where("movies.id=:movieId", { movieId })
      .getOne();

    if (!movie) return res.render("404", { title: "movie" });

    if (movie.user.id !== user.id) {
      return res.redirect(`/movies/${movieId}`);
    }

    res.status(200).render("updateMovie", { movie });
  } catch (error) {
    console.log("Like hatası");
    throw new Error(error);
  }
};
