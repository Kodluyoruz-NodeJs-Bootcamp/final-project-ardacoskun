import { User } from "../entity/User";

export interface IStar {
  starName: string;
  starDescription: string;
  starGender: string;
  published: boolean;
  user: User;
}
