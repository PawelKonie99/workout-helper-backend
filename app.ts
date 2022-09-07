import express from "express";
import cors from "cors";
import { connectToDb } from "./database/connect";
import { userValidationRouter } from "./controller/userValidation";
import { unknownRequest } from "./middlewares/unknowRequest";
import { workoutRouter } from "./controller/workout";
import { foodRouter } from "./controller/food";
export const app = express();

connectToDb();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use("/", userValidationRouter);
app.use("/", workoutRouter);
app.use("/", foodRouter);
app.use(unknownRequest);
