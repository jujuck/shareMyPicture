import express from "express";
import router from "./router";
import { dataSource } from "./client";
import "reflect-metadata";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.14:5173",
      "https://helene-et-julien-partage-de-photo.netlify.app",
    ],
    credentials: true,
  })
);

app.use("/api", router);

// app.listen(4000, async () => {
//   await dataSource.initialize();
//   console.log(`Serveur is listenning on http://localhost:4000`);
// });

app.listen(3000, "0.0.0.0", async () => {
  await dataSource.initialize();
  console.log("Server running on http://0.0.0.0:3000");
});
