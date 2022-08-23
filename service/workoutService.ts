import { IUserCredentials, IRegisterResponse } from "../interfaces/userValidationInterfaces";
import { userModel } from "../database/models/user";
import { ResponseCode } from "../enums/responseCode";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { checkPasswordLenght } from "./helpers/userValiation";
import { ISaveWorkoutResponse, IWorkout, IWorkoutSubmit } from "../interfaces/workoutInterface";
import { workoutModel } from "../database/models/workout";
dotenv.config();

interface IdecodedUser {
  id: string;
  username: string;
}

export const saveWorkoutToDb = async (workoutAndToken: IWorkoutSubmit): Promise<ISaveWorkoutResponse> => {
  try {
    console.log(workoutAndToken);
    const { JWT_TOKEN_SECRET } = process.env;

    const { jwtToken } = workoutAndToken;
    const decodedUser = jwt.verify(jwtToken, JWT_TOKEN_SECRET) as IdecodedUser;

    // const user = await userModel.findByIdAndUpdate(decodedUser.id, { $push: { workout: workoutAndToken.workout.id } });

    const newWorkout = new workoutModel({
      workout: workoutAndToken.workout,
    });

    const test = await newWorkout.save();
    console.log(test);
    // db.Tutorial.findByIdAndUpdate(
    //   tutorialId,
    //   { $push: { comments: docComment._id } },
    //   { new: true, useFindAndModify: false }
    // );

    // const newUser = new userModel({
    //   username,
    //   passwordHash: passwordHash,
    // });

    // await newUser.save();

    return { code: ResponseCode.success, message: "", success: true };
  } catch (error) {
    console.log(error);
    return { code: ResponseCode.badRequest, message: error, success: false };
  }
};
