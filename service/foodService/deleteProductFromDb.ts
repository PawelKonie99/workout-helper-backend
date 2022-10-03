import { mealModel } from "../../database/models/meal";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IDeleteProductResponse } from "../../types/IFood.types";

export const deleteProductFromDb = async (
    userToken: string,
    allDayMealsId: string,
    productId: string
): Promise<IDeleteProductResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.badRequest, success: false };
        }

        const deletedProductResponse = await mealModel.updateOne(
            { _id: allDayMealsId },
            {
                $pull: { breakfast: { _id: productId } },
            }
        );

        return {
            code: ResponseCode.success,
            success: deletedProductResponse.modifiedCount > 0 ? true : false,
        };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
