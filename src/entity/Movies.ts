import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { MovieComments } from "./MovieComments";
import { MovieLikes } from "./MovieLikes";
import { User } from "./User";

@Entity({ name: "movies" })
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: "longtext" })
  description: string;

  @Column({ nullable: false })
  tag: string;

  @Column()
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null, type: "longtext", nullable: true })
  image: string;

  @OneToMany(() => MovieComments, (comments) => comments.movie)
  comments: MovieComments[];

  @OneToMany(() => MovieLikes, (likes) => likes.movie)
  likes: MovieLikes[];

  @ManyToOne(() => User, (user) => user.movies, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;
}
