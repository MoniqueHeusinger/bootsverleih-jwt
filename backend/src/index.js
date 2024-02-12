import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { bootRouter, fileUploadRouter, userRouter } from "./routes/index.js";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3001;
const app = express(); // Server aufsetzen

app.use(cors());
app.use(morgan("dev")); // logging middleware
app.use(express.json()); // body-parser

app.get("/", (req, res) => res.send("it works"));

app.use("/api/boote", bootRouter.default);
app.use("/download", express.static("data/images")); // download assets via static middleware (MULTER)
app.use("/api/files", fileUploadRouter.default);
app.use("/api/users", userRouter.default);

const serverListenToPort = () =>
  app.listen(PORT, () => console.log("Server listening on port", PORT));

// server and database connection setup
console.log("Connecting to database...");
mongoose
  .connect(MONGODB_URL, { dbName: "bootsverleih" })
  .then(() => {
    console.log("Database connection successfull");
    serverListenToPort();
  })
  .catch((err) => {
    console.log("Error connecting to database!");
    console.log(err);
    console.log("Server will not start. Aborting...");
    process.exit(); // beende den node prozess (clean exit)
  });
