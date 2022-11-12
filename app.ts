import express from "express";
import cors from "cors";
import { connectToDb } from "./database/connect";
import { userRouter } from "./controller/user";
import { unknownRequest } from "./middlewares/unknowRequest";
import { workoutRouter } from "./controller/workout";
import { foodRouter } from "./controller/food";
import { trainerRouter } from "./controller/trainer";
import { studentRouter } from "./controller/student";
export const app = express();

connectToDb();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use("/", userRouter);
app.use("/", workoutRouter);
app.use("/", foodRouter);
app.use("/", trainerRouter);
app.use("/", studentRouter);
app.use(unknownRequest);
