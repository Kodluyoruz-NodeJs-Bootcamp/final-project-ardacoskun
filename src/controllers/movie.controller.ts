import { Request, Response } from "express";
import { User } from "../entity/User";
import { IMovie } from "../interfaces/movie.interface";
import * as fs from "fs";
import { Movie } from "../entity/Movies";
import { MovieLikes } from "../entity/MovieLikes";
import { MovieComments } from "../entity/MovieComments";

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

export const getMovies = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    const currentUser = await User.findOne({ id: user.id });

    //All movies published
    const movies = await Movie.createQueryBuilder("movies")
      .leftJoinAndSelect("movies.user", "user")
      .leftJoinAndSelect("movies.comments", "comments")
      .leftJoinAndSelect("movies.likes", "likes")

      .where("movies.published=true")
      .orderBy("movies.createdAt", "DESC")
      .getMany();

    //Movies current users add
    const getCurrentMovies = await Movie.createQueryBuilder()
      .select("movies")
      .from(Movie, "movies")
      .leftJoinAndSelect("movies.user", "user")
      .where("movies.user=:id", { id: currentUser.id })
      .getMany();

    //Movies current users liked
    const userLikes = await MovieLikes.createQueryBuilder("movie_likes")
      .leftJoinAndSelect("movie_likes.movie", "movie")
      .where("movie_likes.owner=:userId", { userId: user.id })
      .getMany();

    const myLikes = [];
    for (let i = 0; i < userLikes.length; i++) {
      myLikes.push(userLikes[i].movie.id);
    }

    res.status(200).render("movies", {
      user: req.user,
      movies,
      currentUser: getCurrentMovies,
      myLikes,
    });
  } catch (error) {
    throw new Error(error as string);
  }
};

//Add comment to Movie
export const createComment = async (req: Request, res: Response) => {
  let { commentField, spoiler } = req.body;

  const movieId = Number(req.params.id);
  const user = req.user as User;

  try {
    const currentMovie = await Movie.findOne({ id: movieId });

    if (!currentMovie) return res.render("404", { title: "movie" });

    spoiler ? (spoiler = true) : (spoiler = false);

    const movieComment = MovieComments.create({
      text: commentField,
      writerId: user.id.toString(),
      writer: user.email,
      movie: currentMovie,
      spoiler,
    });

    await MovieComments.save(movieComment);

    res.status(201).redirect(`/movies/${movieId}`);
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

//Delete movie comment
export const deleteComment = async (req: Request, res: Response) => {
  const movieId = req.params.movieId;

  try {
    await MovieComments.createQueryBuilder()
      .delete()
      .where("id=:id", { id: req.params.id })
      .execute();

    res.status(200).redirect(`/movies/${movieId}`);
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

//Like Movie
export const likeMovie = async (req: Request, res: Response) => {
  const movieId = Number(req.params.id);
  const user = req.user as User;

  try {
    const currentMovie = await Movie.findOne({ id: movieId });

    if (!currentMovie) return res.render("404", { title: "movie" });

    const movieLike = MovieLikes.create({
      owner: user.id.toString(),
      movie: currentMovie,
    });

    await MovieLikes.save(movieLike);

    if (req.params.src == "home") {
      return res.redirect("/movies");
    } else {
      return res.redirect(`/movies/${movieId}`);
    }
  } catch (error) {
    console.log("Like hatas??");
    throw new Error(error as string);
  }
};

//Delete movie like
export const deleteLike = async (req: Request, res: Response) => {
  const movieId = Number(req.params.id);
  const user = req.user as User;

  try {
    const movieLike = await MovieLikes.createQueryBuilder("movie_likes")
      .leftJoinAndSelect("movie_likes.movie", "movie")
      .where("movie_likes.owner=:userId", { userId: user.id })
      .andWhere("movie_likes.movie=:movieId", { movieId })
      .getOne();

    const deleteId = movieLike.id;

    const deleteLike = await MovieLikes.findOne({ id: deleteId });
    await MovieLikes.remove(deleteLike);

    //Checks which page user liked the movie and redirects user according to that info.
    if (req.params.src == "home") {
      return res.redirect("/movies");
    } else {
      return res.redirect(`/movies/${movieId}`);
    }
  } catch (error) {
    console.log("Like hatas??");
    throw new Error(error as string);
  }
};

//UpdateMovie
export const updateMovie = async (req: Request, res: Response) => {
  const movieId = Number(req.params.id);
  const user = req.user as User;
  let { name, description, published, tag } = req.body;
  try {
    const uploadDir = "public/uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const imageName = req.files?.image["name"];
    const image = req.files?.image["data"];
    published ? (published = true) : (published = false);

    //This pile works for if user's change movie image or not.If movie image does not change db keeps the old one.
    if (image === undefined) {
      await Movie.createQueryBuilder()

        .update(Movie)
        .set({
          name,
          description,
          published,
          tag,
        })
        .where("movies.id=:movieId", { movieId })
        .execute();
      return res.redirect("/movies");
    } else {
      fs.writeFileSync(uploadDir + "/" + imageName, image);
      const imageurl = "/uploads/" + imageName;

      console.log(imageurl);

      await Movie.createQueryBuilder()

        .update(Movie)
        .set({
          image: imageurl,
          name,
          description,
          published,
          tag,
        })
        .where("movies.id=:movieId", { movieId })
        .execute();
    }
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

//Delete Movie
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    await Movie.createQueryBuilder()
      .delete()
      .where("id=:id", { id: req.params.id })
      .execute();

    res.status(200).redirect("/movies");
  } catch (error) {
    console.log("Like hatas??");
    throw new Error(error as string);
  }
};
