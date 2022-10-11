import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { IBestExerciseResponse, IExerciseByName } from "../../types/IWorkout.types";
import { tokenAuth } from "../../helpers/tokenAuth";
import { workoutModel } from "../../database/models/workout";
import { userModel } from "../../database/models/user";
import _ from "lodash";
import { transformNamedExercise } from "./helpers/filterNamedExercise";
dotenv.config();

//TODO na exercise name walnac enuma
export const getBestExercise = async (
    userToken: string,
    exerciseName: string
): Promise<IBestExerciseResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);
        if (!decodedUser) {
            return { code: ResponseCode.badRequest, success: false };
        }

        const userWorkoutsIds = await userModel.findById(decodedUser.id).select("workouts").exec();

        const allUserExerciseByName = (await Promise.all(
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
                            workoutData: "$workout.workoutData",
                        },
                    },
                ]);

                return workout;
            })
        )) as IExerciseByName[][];

        const filteredExerciseArray = transformNamedExercise(allUserExerciseByName);

        const weightRecord = _.maxBy(filteredExerciseArray, "workoutData.weightQuantity");

        return {
            code: ResponseCode.success,
            success: true,
            weightRecord: weightRecord.workoutData.weightQuantity.toString(),
        };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
