import express from "express";
const app = express();
import http from "http";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import cookieParser from "cookie-parser";
const server = http.createServer(app);
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";


app.use(cookieParser());
//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", express.static("public"));
// cors
app.use(
  cors({
    origin: ["http://localhost:3000","https://pdf.medoncall.online"],
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app.use("/generatedpdf", express.static(path.join(__dirname, "generatedpdf")));

const port = process.env.PORT || 5000;
//listen port
server.listen(port, () => {
  console.log(
    `server running in ${process.env.NODE_MODE} Mod on port ${process.env.PORT}`
      .bgCyan.white
  );
});

import userRouter from "./routes/userRouter.js";
import { connectDB } from "./config/db.js";

app.use("/api", userRouter);
