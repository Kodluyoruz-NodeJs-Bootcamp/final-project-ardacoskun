import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Star } from "./Stars";

@Entity()
export class StarComments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  writer: string;

  @Column()
  writerId: string;

  @Column({ type: "longtext" })
  text: string;

  @ManyToOne(() => Star, (star) => star.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  star: Star;
}
