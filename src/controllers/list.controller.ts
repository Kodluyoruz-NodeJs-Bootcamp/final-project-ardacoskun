import { Request, Response } from "express";
import { MovieComments } from "../entity/MovieComments";
import { MovieLikes } from "../entity/MovieLikes";
import { Movie } from "../entity/Movies";
import { StarComments } from "../entity/StarComments";
import { StarLikes } from "../entity/StarLikes";
import { Star } from "../entity/Stars";
import { User } from "../entity/User";

export const getMyListsPage = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    const currentMovies = await Movie.createQueryBuilder()
      .select("movies")
      .from(Movie, "movies")
      .leftJoinAndSelect("movies.user", "user")
      .leftJoinAndSelect("movies.comments", "comments")
      .leftJoinAndSelect("movies.likes", "likes")
      .where("movies.user=:id", { id: user.id })
      .orderBy("movies.createdAt", "DESC")
      .getMany();

    const userLikes = await MovieLikes.createQueryBuilder("movie_likes")
      .leftJoinAndSelect("movie_likes.movie", "movie")
      .where("movie_likes.owner=:userId", { userId: user.id })
      .getMany();

    const myLikes = [];
    for (let i = 0; i < userLikes.length; i++) {
      myLikes.push(userLikes[i].movie.id);
    }

    res.status(200).render("myLists", { currentMovies, myLikes });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getMyLikedMoviesPage = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    const userLikes = await MovieLikes.createQueryBuilder("movie_likes")
      .leftJoinAndSelect("movie_likes.movie", "movie")
      .where("movie_likes.owner=:userId", { userId: user.id })
      .getMany();

    const myLikes = [];
    for (let i = 0; i < userLikes.length; i++) {
      myLikes.push(userLikes[i].movie.id);
    }

    res.status(200).render("likedMovies", { myLikes, userLikes });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getMyCommentedMoviesPage = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    const userComments = await MovieComments.createQueryBuilder(
      "movie_comments"
    )
      .leftJoinAndSelect("movie_comments.movie", "movie")
      .where("movie_comments.writerId=:userId", { userId: user.id })
      .getMany();

    res.status(200).render("commentedMovies", { userComments });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getMyStarsPage = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    //Movies current users add
    const currentStars = await Star.createQueryBuilder()
      .select("stars")
      .from(Star, "stars")
      .leftJoinAndSelect("stars.user", "user")
      .leftJoinAndSelect("stars.comments", "comments")
      .leftJoinAndSelect("stars.likes", "likes")
      .where("stars.user=:id", { id: user.id })
      .orderBy("stars.createdAt", "DESC")
      .getMany();

    const userLikes = await StarLikes.createQueryBuilder("star_likes")
      .leftJoinAndSelect("star_likes.star", "star")
      .where("star_likes.owner=:userId", { userId: user.id })
      .getMany();

    const myLikes = [];
    for (let i = 0; i < userLikes.length; i++) {
      myLikes.push(userLikes[i].star.id);
    }

    res.status(200).render("myStars", { currentStars, myLikes });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getMyLikedStarsPage = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    const userLikes = await StarLikes.createQueryBuilder("star_likes")
      .leftJoinAndSelect("star_likes.star", "star")
      .where("star_likes.owner=:userId", { userId: user.id })
      .getMany();

    const myLikes = [];
    for (let i = 0; i < userLikes.length; i++) {
      myLikes.push(userLikes[i].star.id);
    }

    console.log("userlikes", userLikes);

    res.status(200).render("likedStars", { myLikes, userLikes });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getMyCommentedStarsPage = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    const userComments = await StarComments.createQueryBuilder("star_comments")
      .leftJoinAndSelect("star_comments.star", "star")
      .where("star_comments.writerId=:userId", { userId: user.id })
      .getMany();

    console.log("comments", userComments);

    res.status(200).render("commentedStars", { userComments });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
