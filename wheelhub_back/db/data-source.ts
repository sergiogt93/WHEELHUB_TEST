import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User.entity"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db/sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: []
})
