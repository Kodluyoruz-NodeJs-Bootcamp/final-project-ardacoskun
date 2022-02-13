import express, { Request, Response } from "express";
import { StarComments } from "../entity/StarComments";
import { StarLikes } from "../entity/StarLikes";
import { Star } from "../entity/Stars";
import { User } from "../entity/User";
import * as fs from "fs";
import { IStar } from "../interfaces/star.interface";

express.Router();

export const getStars = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    const currentUser = await User.findOne({ id: user.id });

    //All Stars published
    const stars = await Star.createQueryBuilder("stars")
      .leftJoinAndSelect("stars.user", "user")
      .leftJoinAndSelect("stars.comments", "comments")
      .leftJoinAndSelect("stars.likes", "likes")

      .where("stars.published=true")
      .orderBy("stars.createdAt", "DESC")
      .getMany();

    //Stars current users add
    const getCurrentStars = await Star.createQueryBuilder()
      .select("stars")
      .from(Star, "stars")
      .leftJoinAndSelect("stars.user", "user")
      .where("stars.user=:id", { id: currentUser.id })
      .getMany();

    //Stars current users liked
    const userLikes = await StarLikes.createQueryBuilder("star_likes")
      .leftJoinAndSelect("star_likes.star", "star")
      .where("star_likes.owner=:userId", { userId: user.id })
      .getMany();

    const myLikes = [];
    for (let i = 0; i < userLikes.length; i++) {
      myLikes.push(userLikes[i].star.id);
    }

    res.status(200).render("stars", {
      user: req.user,
      stars,
      currentUser: getCurrentStars,
      myLikes,
    });
  } catch (error) {
    console.log("Film hatası Stars");
    res.redirect("/signin");
  }
};

//Create a new star
export const createStar = async (req: Request, res: Response) => {
  let { starName, starDescription, published, starGender }: IStar = req.body;

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

    const star = Star.create({
      name: starName,
      description: starDescription,
      gender: starGender,
      published,
      image: imageurl,
      user: currentUser,
    });

    await Star.save(star);

    return res.redirect("/stars");
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

//Add comment to Star
export const createComment = async (req: Request, res: Response) => {
  let { commentField } = req.body;

  const starId = Number(req.params.id);
  const user = req.user as User;

  try {
    const currentStar = await Star.findOne({ id: starId });

    const starComments = StarComments.create({
      text: commentField,
      writerId: user.id.toString(),
      writer: user.email,
      star: currentStar,
    });

    await StarComments.save(starComments);
    //console.log(StarComment);
    res.redirect(`/stars/${starId}`);
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

//Delete star comment

export const deleteComment = async (req: Request, res: Response) => {
  const starId = req.params.starId;

  try {
    await StarComments.createQueryBuilder()
      .delete()
      .where("id=:id", { id: req.params.id })
      .execute();

    res.redirect(`/stars/${starId}`);
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

//Like Star
export const likeStar = async (req: Request, res: Response) => {
  const starId = Number(req.params.id);
  const user = req.user as User;

  try {
    const currentStar = await Star.findOne({ id: starId });

    const starLike = StarLikes.create({
      owner: user.id.toString(),
      star: currentStar,
    });

    await StarLikes.save(starLike);
    if (req.params.src == "home") {
      return res.redirect("/stars");
    } else {
      return res.redirect(`/stars/${starId}`);
    }
  } catch (error) {
    console.log("Like hatası");
    throw new Error(error as string);
  }
};

//Delete star like
export const deleteLike = async (req: Request, res: Response) => {
  const starId = Number(req.params.id);
  const user = req.user as User;

  try {
    const starLike = await StarLikes.createQueryBuilder("star_likes")
      .leftJoinAndSelect("star_likes.star", "star")
      .where("star_likes.owner=:userId", { userId: user.id })
      .andWhere("star_likes.star=:starId", { starId })
      .getOne();

    const deleteId = starLike.id;

    const deleteLike = await StarLikes.findOne({ id: deleteId });
    await StarLikes.remove(deleteLike);

    //Checks which page user liked the star and redirects user according to that info.

    if (req.params.src == "home") {
      return res.redirect("/stars");
    } else {
      return res.redirect(`/stars/${starId}`);
    }
  } catch (error) {
    console.log("Like hatası");
    throw new Error(error as string);
  }
};

//UpdateStar
export const updateStar = async (req: Request, res: Response) => {
  const starId = Number(req.params.id);
  const user = req.user as User;
  let { name, description, published, gender } = req.body;
  try {
    const uploadDir = "public/uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const imageName = req.files?.image["name"];
    const image = req.files?.image["data"];
    published ? (published = true) : (published = false);

    //This pile works for if user's change star image or not.If star image does not change db keeps the old one.
    if (image === undefined) {
      await Star.createQueryBuilder()

        .update(Star)
        .set({
          name,
          description,
          published,
          gender,
        })
        .where("stars.id=:starId", { starId })
        .execute();
      return res.redirect("/stars");
    } else {
      fs.writeFileSync(uploadDir + "/" + imageName, image);
      const imageurl = "/uploads/" + imageName;

      await Star.createQueryBuilder()

        .update(Star)
        .set({
          image: imageurl,
          name,
          description,
          published,
          gender,
        })
        .where("stars.id=:starId", { starId })
        .execute();
    }
    res.redirect("/stars");
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

//Delete Star
export const deleteStar = async (req: Request, res: Response) => {
  try {
    await Star.createQueryBuilder()
      .delete()
      .where("id=:id", { id: req.params.id })
      .execute();

    res.redirect("/stars");
  } catch (error) {
    console.log("Like hatası");
    throw new Error(error as string);
  }
};
