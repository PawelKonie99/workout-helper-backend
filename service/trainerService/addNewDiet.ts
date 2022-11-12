import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IProductPayload } from "../../types/IFood.types";
import { addProductToDiet } from "./helpers/addProductToDiet";
import { IStandardResponse } from "../../types/common.types";
dotenv.config();

//TODO pomyslec nad tym, zeby sprawdzac czy student nalezy do danego trenera
export const addNewDiet = async (
    studentId: string,
    userToken: string,
    productPayload: IProductPayload
): Promise<IStandardResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, message: "User not found", success: false };
        }

        await addProductToDiet(studentId, productPayload);

        return {
            code: ResponseCode.success,
            message: "Product saved successfully to databse",
            success: true,
        };
    } catch (error) {
        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
