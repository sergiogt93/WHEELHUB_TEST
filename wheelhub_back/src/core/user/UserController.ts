import { Response } from "express"
import { CustomRequest } from "../common/CustomRequest";
import { createUserInput } from "./UserValidateInput";
import { UserRepository } from "./UserRepository";
import { User } from "../../../db/entities/User.entity";

export const UserController = {
  post: async (req: CustomRequest<createUserInput>, res: Response) => {
    const { username, password } = req.body

    const newUser = new User();
    newUser.username = username;
    newUser.password = password;

    try {
      const createdUser = await UserRepository.post(newUser);
      return res.status(201).json({ user: createdUser });
    } catch (err: unknown) {
      return res.status(409).json({ message: "username already exists" })
    }
  }
}