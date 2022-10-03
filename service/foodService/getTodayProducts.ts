import { mealModel } from "../../database/models/meal";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { ITodayProductsResponse } from "../../types/IFood.types";
import { allUserProducts } from "./helpers/allUserProducts";
import { sumMealProductsData } from "./helpers/sumMealProductsData";

export const getTodayProducts = async (userToken: string): Promise<ITodayProductsResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);
        const date = new Date().toLocaleDateString();

        if (!decodedUser) {
            return { code: ResponseCode.badRequest, success: false };
        }

        const getAllUserProducts = await allUserProducts({ mealModel, userModel, decodedUser });

        const todayUserProducts = getAllUserProducts.find(({ mealDate }) => mealDate === date);

        const summedProductsData = {
            breakfast: sumMealProductsData(todayUserProducts, "breakfast"),
            brunch: sumMealProductsData(todayUserProducts, "brunch"),
            dinner: sumMealProductsData(todayUserProducts, "dinner"),
            dessert: sumMealProductsData(todayUserProducts, "dessert"),
            supper: sumMealProductsData(todayUserProducts, "supper"),
        };

        const { breakfast, brunch, dinner, dessert, supper } = summedProductsData;

        const dailySummary = {
            totalKcal: breakfast.kcal + brunch.kcal + dinner.kcal + dessert.kcal + supper.kcal,
            totalProteins:
                breakfast.proteins + brunch.proteins + dinner.proteins + dessert.proteins + supper.proteins,
            totalFat: breakfast.fat + brunch.fat + dinner.fat + dessert.fat + supper.fat,
            totalCarbons:
                breakfast.carbons + brunch.carbons + dinner.carbons + dessert.carbons + supper.carbons,
        };

        if (!todayUserProducts) {
            return {
                code: ResponseCode.success,
                success: true,
                todayUserProducts: undefined,
                dailySummary: undefined,
            };
        }

        console.log("todayUserProducts", todayUserProducts);

        return { code: ResponseCode.success, success: true, todayUserProducts, dailySummary };
    } catch (error) {
        console.log(error);

        return { code: ResponseCode.badRequest, success: false };
    }
};
