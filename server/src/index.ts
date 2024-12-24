import express from "express";
import router from "./router";
import { dataSource } from "./client";
import "reflect-metadata";
const app = express();

app.use("/api", router);

app.listen(3001, async () => {
  await dataSource.initialize();
  console.log(`Serveur is listenning on http://localhost:3001`);
});
