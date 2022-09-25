import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { workoutModel } from "../../database/models/workout";
import { IWorkout, ISaveWorkoutResponse } from "../../types/IWorkout.types";
import { tokenAuth } from "../../helpers/tokenAuth";
dotenv.config();

export const saveWorkoutToDb = async (
    workout: IWorkout,
    userToken: string
): Promise<ISaveWorkoutResponse> => {
    try {
        const { workoutData } = workout;

        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.badRequest, message: "User not found", success: false };
        }

        const newWorkout = new workoutModel({
            workout: {
                workoutData,
                date: new Date(),
            },
        });
        const savedWorkout = await newWorkout.save();

        await userModel.findByIdAndUpdate(decodedUser.id, {
            $push: { workouts: savedWorkout },
        });

        return {
            code: ResponseCode.success,
            message: "Workout saved successfully to databse",
            success: true,
        };
    } catch (error) {
        console.log(error);
        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
