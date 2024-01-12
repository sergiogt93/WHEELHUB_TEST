import { AppDataSource } from "../../../db/data-source";
import { User } from "../../../db/entities/User.entity";

const repository = AppDataSource.getRepository(User);

export const UserRepository = {
  post: async(data: User): Promise<User> => {
    return repository.save(data);
  }
}