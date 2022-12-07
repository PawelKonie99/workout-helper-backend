import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IProductPayload } from "../../types/IFood.types";
import { addProductToDiet } from "./helpers/addProductToDiet";
import { IStandardResponse } from "../../types/common.types";
import { userModel } from "../../database/models/user";
dotenv.config();

interface IaddNewDietProduct {
    studentId: string;
    productPayload: IProductPayload;
}

//TODO pomyslec nad tym, zeby sprawdzac czy student nalezy do danego trenera
export const addNewDietProduct = async (
    userToken: string,
    userAndProductData: IaddNewDietProduct
): Promise<IStandardResponse> => {
    try {
        const { studentId, productPayload } = userAndProductData;

        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, message: "User not found", success: false };
        }

        const { studentResourcesId } = await userModel.findById(studentId);

        await addProductToDiet(studentResourcesId.toString(), productPayload);

        return {
            code: ResponseCode.success,
            message: "Product saved successfully to databse",
            success: true,
        };
    } catch (error) {
        console.log("error", error);

        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
