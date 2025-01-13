import express from "express";
import { AppDataSource } from "./DAL/config/db";
import { appRouter } from "./routes";

const app = express();
const port = 3000;

app.use(express.json())

app.use('/',appRouter)
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // Express uygulamasını başlat
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
