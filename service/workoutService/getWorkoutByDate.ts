import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { workoutModel } from "../../database/models/workout";
import { IAllWorkoutsResponse } from "../../types/IWorkout.types";
import { tokenAuth } from "../../helpers/tokenAuth";

dotenv.config();

export const getWorkoutByDate = async (
    userToken: string,
    dateToFind: string
): Promise<IAllWorkoutsResponse> => {
    try {
        const formatedDate = dateToFind.replaceAll("-", "/");

        const decodedUser = tokenAuth(userToken);
        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const userWorkoutsIds = await userModel.findById(decodedUser.id).select("workouts").exec();

        const allUserWorkouts = await Promise.all(
            userWorkoutsIds.workouts.map(async (workoutId) => {
                const workout = await workoutModel.findById(workoutId);

                return workout;
            })
        );

        const filteredWorkoutsByDate = allUserWorkouts.filter(
            ({ workout: { date } }) => date === formatedDate
        );

        return { code: ResponseCode.success, success: true, allUserWorkouts: filteredWorkoutsByDate };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
