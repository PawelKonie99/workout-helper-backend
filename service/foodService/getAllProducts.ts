import { mealModel } from "../../database/models/meal";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IAllProductsResponse } from "../../types/IFood.types";
import { allUserProducts } from "./helpers/allUserProducts";

export const getAllProducts = async (userToken: string): Promise<IAllProductsResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const getAllUserProducts = await allUserProducts({ mealModel, userModel, userId: decodedUser.id });

        return { code: ResponseCode.success, success: true, allUserProducts: getAllUserProducts };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
