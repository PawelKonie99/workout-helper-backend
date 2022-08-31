import { IUserCredentials, IRegisterResponse } from "../types/IUserValidation.types";
import { userModel } from "../database/models/user";
import { ResponseCode } from "../enums/responseCode";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { checkPasswordLenght } from "./helpers/userValiation";
import { workoutModel } from "../database/models/workout";
import { INewWorkout, ISaveWorkoutResponse } from "../types/INewWorkout.types";
dotenv.config();

interface IdecodedUser {
    id: string;
    username: string;
}

export const saveWorkoutToDb = async (
    workout: INewWorkout,
    userToken: string
): Promise<ISaveWorkoutResponse> => {
    try {
        const { JWT_TOKEN_SECRET } = process.env;
        const { workoutData } = workout;

        const transformedToken = userToken.replace("Bearer ", "");

        const decodedUser = jwt.verify(transformedToken, JWT_TOKEN_SECRET) as IdecodedUser;

        const newWorkout = new workoutModel({
            workoutData,
        });
        const savedWorkout = await newWorkout.save();

        await userModel.findByIdAndUpdate(decodedUser.id, {
            $push: { workouts: savedWorkout },
        });

        return { code: ResponseCode.success, message: "Workout save successfully to databse", success: true };
    } catch (error) {
        console.log(error);
        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
