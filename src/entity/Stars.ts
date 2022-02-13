import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { StarComments } from "./StarComments";
import { StarLikes } from "./StarLikes";

@Entity({ name: "stars" })
export class Star extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: "longtext" })
  description: string;

  @Column({ nullable: false })
  gender: string;

  @Column()
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null, type: "longtext", nullable: true })
  image: string;

  @OneToMany(() => StarComments, (comments) => comments.star)
  comments: StarComments[];

  @OneToMany(() => StarLikes, (likes) => likes.star)
  likes: StarLikes[];

  @ManyToOne(() => User, (user) => user.stars, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;
}
