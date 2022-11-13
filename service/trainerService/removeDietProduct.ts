import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IStandardResponse } from "../../types/common.types";
import { IRemoveDietProductPayload } from "../../types/ITrainer.types";
import { deleteProductFromDiet } from "./helpers/deleteProductFromDiet";
dotenv.config();

interface IRemoveDietProduct {
    studentId: string;
    productToRemove: IRemoveDietProductPayload;
}

//TODO pomyslec nad tym, zeby sprawdzac czy student nalezy do danego trenera
export const removeDietProduct = async (
    userToken: string,
    userAndProductData: IRemoveDietProduct
): Promise<IStandardResponse> => {
    try {
        const { productToRemove, studentId } = userAndProductData;

        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, message: "User not found", success: false };
        }

        const deletedProductResponse = await deleteProductFromDiet(studentId, productToRemove);

        return {
            code: ResponseCode.success,
            message: "Product successfully removed from databse",
            success: deletedProductResponse > 0 ? true : false,
        };
    } catch (error) {
        console.log("error", error);

        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
