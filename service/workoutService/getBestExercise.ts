import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { IBestExerciseResponse, IExerciseByName } from "../../types/IWorkout.types";
import { tokenAuth } from "../../helpers/tokenAuth";
import { workoutModel } from "../../database/models/workout";
import { userModel } from "../../database/models/user";
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
            return { code: ResponseCode.unauthorized, success: false };
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

        const transformedExerciseArray = transformNamedExercise(allUserExerciseByName);

        const weightRecord = Math.max(
            ...transformedExerciseArray.map(({ workoutData: { weightQuantity } }) => weightQuantity)
        );

        //Rekord ciezaru moze powtarzac sie w kilku cwiczeniach
        const exercisesWithWeightRecord = transformedExerciseArray.filter(
            ({ workoutData: { weightQuantity } }) => Number(weightQuantity) === weightRecord
        );

        //Tutaj szukamy najlepszego cwiczenia z tych ktore sa juz odfiltrowane
        const exerciseWithRecord = exercisesWithWeightRecord.reduce((previousValue, currentValue) =>
            previousValue.workoutData.repsQuantity * previousValue.workoutData.seriesQuantity >
            currentValue.workoutData.repsQuantity * currentValue.workoutData.seriesQuantity
                ? previousValue
                : currentValue
        );

        return {
            code: ResponseCode.success,
            success: true,
            exerciseWithRecord,
        };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false }; //TODO wywalic ten obiekt z errorow
    }
};
