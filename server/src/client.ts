import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Images } from "./images/images.entities";
import { User } from "./users/user.entities";

dotenv.config();
const { BACKEND_FILE } = process.env;

export const dataSource = new DataSource({
  type: "sqlite",
  database: `${BACKEND_FILE}`,
  entities: [Images, User],
  synchronize: true,
});
