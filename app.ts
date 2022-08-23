import express from "express";
import cors from "cors";
import { connectToDb } from "./database/connect";
import { userValidationRouter } from "./controller/userValidation";
import { unknownRequest } from "./middlewares/unknowRequest";
import { workoutRouter } from "./controller/workout";
// import { categoryRouter } from "./controllers/category";
// import { keywordRouter } from "./controllers/keyword";
export const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.post("/es", async (req, res) => {
//   const newUser = new userModel({
//     username: "elo",
//     passwordHash: "siema",
//   });

//   const user = await newUser.save();

//   res.status(200).json(user);
// });

connectToDb();
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use("/", userValidationRouter);
app.use("/", workoutRouter);
// app.use("/", keywordRouter);

app.use(unknownRequest);

// module.exports = app;
