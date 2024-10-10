import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import connectDb from "./config/config.js";
import verificationRoute from "./routes/verificationRoute.js";
import registrationRouter from "./routes/registrationRouter.js";
import UploadRoute from "./routes/uploadRoute.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use("/img", express.static("img"));

dotenv.config();

//env configs
const PORT = process.env.PORT;

//Connection
connectDb()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Port has started on  ${PORT}`);
    })
  )
  .catch((err) => console.log(`${err} did not connect`));

//Route
app.use("/vaidation", verificationRoute);
app.use("/add", registrationRouter);

//Upload Route for file upload
app.use("/upload", UploadRoute);
