import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IDeleteProductResponse, IProductToDelete } from "../../types/IFood.types";
import { deleteProperMeal } from "./helpers/deleteProperMeal";

export const deleteProductFromDb = async (
    userToken: string,
    productToDelete: IProductToDelete
): Promise<IDeleteProductResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const deletedProductResponse = await deleteProperMeal(productToDelete);

        return {
            code: ResponseCode.success,
            success: deletedProductResponse > 0 ? true : false,
        };
    } catch (error) {
        console.log("error", error);

        return { code: ResponseCode.badRequest, success: false };
    }
};
