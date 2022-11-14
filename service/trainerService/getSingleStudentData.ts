import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { mealModel } from "../../database/models/meal";
import { IGetSingleStudentDataResponse } from "../../types/ITrainer.types";
import { userModel } from "../../database/models/user";
import { workoutModel } from "../../database/models/workout";
import { allUserProducts } from "../foodService/helpers/allUserProducts";
import { fullDailyMealData } from "../foodService/helpers/fullDailyMealData";

dotenv.config();

export const getSingleStudentData = async (
    userToken: string,
    userId: string
): Promise<IGetSingleStudentDataResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);
        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const userWorkoutsIds = await userModel.findById(userId).select("workouts").exec();

        const allUserWorkouts = await Promise.all(
            userWorkoutsIds.workouts.map(async (workoutId) => {
                const workout = await workoutModel.findById(workoutId);

                return workout;
            })
        );

        const getAllUserProducts = await allUserProducts({ mealModel, userModel, userId });

        const mealHistory = getAllUserProducts.map((products) => {
            const { dailySummary, breakfast, brunch, dinner, dessert, supper } = fullDailyMealData({
                products,
            });

            return {
                mealDate: products.mealDate,
                dailySummary,
                breakfast,
                brunch,
                dinner,
                dessert,
                supper,
            };
        });

        return { code: ResponseCode.success, success: true, allUserWorkouts, mealHistory };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
