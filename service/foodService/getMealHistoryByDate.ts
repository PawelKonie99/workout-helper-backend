import _ from "lodash";
import { mealModel } from "../../database/models/meal";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IMealHistoryResponse } from "../../types/IFood.types";
import { allUserProducts } from "./helpers/allUserProducts";
import { fullDailyMealData } from "./helpers/fullDailyMealData";

export const getMealHistoryByDate = async (
    userToken: string,
    dateToFind: string
): Promise<IMealHistoryResponse> => {
    try {
        const formatedDate = dateToFind.replaceAll("-", "/");

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

        const filteredProductsByDate = mealHistory.filter(({ mealDate }) => mealDate === formatedDate);

        return { code: ResponseCode.success, success: true, mealHistory: filteredProductsByDate };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
