import { userModel } from "../database/models/user";
import { ResponseCode } from "../enums/responseCode";
import dotenv from "dotenv";
import { workoutModel } from "../database/models/workout";
import { IWorkout, ISaveWorkoutResponse, IAllWorkoutsResponse } from "../types/IWorkout.types";
import { tokenAuth } from "./helpers/tokenAuth";
dotenv.config();

export const saveWorkoutToDb = async (
    workout: IWorkout,
    userToken: string
): Promise<ISaveWorkoutResponse> => {
    try {
        const { workoutData } = workout;

        const decodedUser = tokenAuth(userToken);

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

        return { code: ResponseCode.success, message: "Workout save successfully to databse", success: true };
    } catch (error) {
        console.log(error);
        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};

export const getAllUserWorkouts = async (userToken: string): Promise<IAllWorkoutsResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);
        const userWorkoutsIds = await userModel.findById(decodedUser.id).select("workouts").exec();

        const allUserWorkouts = await Promise.all(
            userWorkoutsIds.workouts.map(async (workoutId) => {
                const workout = await workoutModel.findById(workoutId);

                return workout;
            })
        );

        return { code: ResponseCode.success, success: true, allUserWorkouts };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
