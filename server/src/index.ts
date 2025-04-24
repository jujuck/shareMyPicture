import express from "express";
import router from "./router";
import path from "path";
import { dataSource } from "./client";
import "reflect-metadata";
import cors from "cors";
import "dotenv/config";
import { signup } from "./utils/users";
const app = express();
let initialization = true;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", router);

const uploadDir = "./public";
app.use("/public", express.static(path.resolve(uploadDir)));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await dataSource.initialize();

  if (initialization) {
    await signup();
    initialization = false;
  }
  console.log(`Serveur is listenning on http://localhost:${PORT}`);
});

// app.listen(3000, "0.0.0.0", async () => {
//   await dataSource.initialize();
//   console.log("Server running on http://0.0.0.0:3000");
// });
