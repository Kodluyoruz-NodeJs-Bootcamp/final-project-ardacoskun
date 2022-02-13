import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Movie } from "./Movies";
import { Star } from "./Stars";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  facebookId: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: false })
  provider: string;

  @OneToMany(() => Movie, (movies) => movies.user)
  movies: Movie[];

  @OneToMany(() => Star, (stars) => stars.user)
  stars: Star[];

  //Password hash function
  async hashPassword() {
    try {
      const user = this;
      user.password = await bcrypt.hash(user.password, 10);

      return user;
    } catch (error) {
      throw new Error("Hashing pasword error");
    }
  }

  //Check users credentials
  async findByCredentials(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) throw "User is not found";

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw "Password is not correct";

    return user;
  }
}
