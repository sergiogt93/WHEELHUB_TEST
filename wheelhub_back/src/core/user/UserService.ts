import { User } from "../../../db/entities/User.entity";
import { UserRepository } from "./UserRepository";
import { createUserInput } from "./UserValidateInput";
import UserAlreadyExistsException from "./UserAlreadyExistsException";

export const UserService = {
  create: async (user: createUserInput) => {
    const { username, password } = user;

    const newUser = new User();
    newUser.username = username;
    newUser.password = password;

    try {
      const createdUser = await UserRepository.post(newUser);
      return createdUser;
    } catch (error) {
      if(error.errno === 19) throw new UserAlreadyExistsException()
    }
  }
}