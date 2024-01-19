import { Response } from "express";
import { CustomRequest } from "../common/CustomRequest";
import { createUserInput } from "./UserValidateInput";
import { UserService } from "./UserService";
import UserAlreadyExistsException from "./UserAlreadyExistsException";

export const UserController = {
  post: async (req: CustomRequest<createUserInput>, res: Response) => {

    try {
      const createdUser = await UserService.create(req.body);
      return res.status(201).json({ user: createdUser });
    } catch (err: unknown) {
      if(err instanceof UserAlreadyExistsException) {
        return res.status(err.statusCode).json({ message: err.message })
      }
    }
  }
}