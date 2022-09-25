import { mealModel } from "../../database/models/meal";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IAllProductsResponse } from "../../types/IFood.types";

export const getAllProducts = async (userToken: string): Promise<IAllProductsResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.badRequest, success: false };
        }

        //Szukamy wszystkich id posilkow uzytkownika
        const userMealsIds = await userModel.findById(decodedUser.id).select("meals").exec();

        //tutaj otrzyujemy tablice z wszystkimi obiektami posilkow
        const allUserProducts = await Promise.all(
            userMealsIds.meals.map(async (mealId) => {
                const workout = await mealModel.findById(mealId);

                return workout;
            })
        );

        return { code: ResponseCode.success, success: true, allUserProducts };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
