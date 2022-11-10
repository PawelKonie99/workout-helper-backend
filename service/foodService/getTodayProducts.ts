import { mealModel } from "../../database/models/meal";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { ITodayProductsResponse } from "../../types/IFood.types";
import { allUserProducts } from "./helpers/allUserProducts";
import { fullDailyMealData } from "./helpers/fullDailyMealData";

export const getTodayProducts = async (userToken: string): Promise<ITodayProductsResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);
        const date = new Date().toLocaleDateString();

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const getAllUserProducts = await allUserProducts({ mealModel, userModel, decodedUser });

        const todayUserProducts = getAllUserProducts.find(({ mealDate }) => mealDate === date);

        if (!todayUserProducts) {
            return {
                code: ResponseCode.success,
                success: true,
                todayUserProducts: {},
                dailySummary: {},
            };
        }

        const { dailySummary } = fullDailyMealData({
            products: todayUserProducts,
        });

        return { code: ResponseCode.success, success: true, todayUserProducts, dailySummary };
    } catch (error) {
        console.log(error);

        return { code: ResponseCode.badRequest, success: false };
    }
};
