import "dotenv/config";
import express from "express";
// import indexRouter from "./routes/indexRouter";
// import "./controllers/indexController.ts";
const app = express();
import path from "node:path";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

// app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Blog API Backend - listening on port ${PORT}!`);
});