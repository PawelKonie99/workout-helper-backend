import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { workoutModel } from "../../database/models/workout";
import { IAllWorkoutsResponse } from "../../types/IWorkout.types";
import { tokenAuth } from "../../helpers/tokenAuth";
dotenv.config();

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
