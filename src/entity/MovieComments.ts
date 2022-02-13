import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Movie } from "./Movies";

@Entity()
export class MovieComments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  writer: string;

  @Column()
  writerId: string;

  @Column({ type: "longtext" })
  text: string;

  @Column()
  spoiler: boolean;

  @ManyToOne(() => Movie, (movie) => movie.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  movie: Movie;
}
