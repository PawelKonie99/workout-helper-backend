import { mealModel } from "../../database/models/meal";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IMealHistoryResponse } from "../../types/IFood.types";
import { allUserProducts } from "./helpers/allUserProducts";
import { fullDailyMealData } from "./helpers/fullDailyMealData";

export const getMealHistory = async (userToken: string): Promise<IMealHistoryResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const getAllUserProducts = await allUserProducts({ mealModel, userModel, userId: decodedUser.id });

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

        return { code: ResponseCode.success, success: true, mealHistory };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
