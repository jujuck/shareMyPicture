import express from "express";
import router from "./router";
import { dataSource } from "./client";
import "reflect-metadata";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: ["http://lolcahost:5173"],
    credentials: true,
  })
);

app.use("/", router);

app.listen(3001, async () => {
  await dataSource.initialize();
  console.log(`Serveur is listenning on http://localhost:3001`);
});
