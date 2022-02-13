import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Star } from "./Stars";

@Entity()
export class StarLikes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  owner: string;

  @ManyToOne(() => Star, (star) => star.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  star: Star;
}
