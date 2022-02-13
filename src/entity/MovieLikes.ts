import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Movie } from "./Movies";

@Entity()
export class MovieLikes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  owner: string;

  @ManyToOne(() => Movie, (movie) => movie.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  movie: Movie;
}
