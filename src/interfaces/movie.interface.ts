import { User } from "../entity/User";

export interface IMovie {
  movieName: string;
  movieDescription: string;
  movieTag: string;
  published: boolean;
  user: User;
}
