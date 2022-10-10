import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { IAllWorkoutOptionsResponse } from "../../types/IWorkout.types";
import { tokenAuth } from "../../helpers/tokenAuth";
import { EXERCISE_NAME, REPS_QUANTITY, SERIES_QUANTITY, WEIGHT_QUANTITY } from "../../const/workoutOptions";
import { workoutModel } from "../../database/models/workout";
import { userModel } from "../../database/models/user";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import _ from "lodash";
dotenv.config();

//TODO na exercise name walnac enuma
export const getBestExercise = async (userToken: string, exerciseName: string): Promise<any> => {
    try {
        const decodedUser = tokenAuth(userToken);
        if (!decodedUser) {
            return { code: ResponseCode.badRequest, success: false };
        }

        const userWorkoutsIds = await userModel.findById(decodedUser.id).select("workouts").exec();

        const allUserExerciseByName = await Promise.all(
            userWorkoutsIds.workouts.map(async (workoutId) => {
                const workout = await workoutModel.aggregate([
                    {
                        $match: {
                            "workout.workoutData.exerciseName": `${exerciseName}`,
                        },
                    },
                    {
                        $unwind: "$workout.workoutData",
                    },
                    {
                        $match: {
                            "workout.workoutData.exerciseName": `${exerciseName}`,
                        },
                    },
                    { $match: { $expr: { $eq: ["$_id", { $toObjectId: workoutId }] } } },

                    {
                        $project: {
                            code: "$workout.workoutData",
                        },
                    },
                ]);

                return workout;
            })
        );

        const filteredExerciseArray = allUserExerciseByName.filter((element) => {
            if (element.length > 0) {
                return [element];
            }
        });

        console.log("filteredExerciseArray", filteredExerciseArray);

        return { code: ResponseCode.success, success: true, filteredExerciseArray };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
