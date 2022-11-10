import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { IAllWorkoutOptionsResponse } from "../../types/IWorkout.types";
import { tokenAuth } from "../../helpers/tokenAuth";
import { EXERCISE_NAME, REPS_QUANTITY, SERIES_QUANTITY, WEIGHT_QUANTITY } from "../../const/workoutOptions";
dotenv.config();

export const getAllWorkoutOptions = async (userToken: string): Promise<IAllWorkoutOptionsResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);
        if (!decodedUser) {
            return {
                code: ResponseCode.unauthorized,
                success: false,
            };
        }

        return {
            code: ResponseCode.success,
            success: true,
            exercise: EXERCISE_NAME,
            reps: REPS_QUANTITY,
            series: SERIES_QUANTITY,
            weight: WEIGHT_QUANTITY,
        };
    } catch (error) {
        return {
            code: ResponseCode.badRequest,
            success: false,
        };
    }
};
