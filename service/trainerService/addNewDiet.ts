import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IProductPayload } from "../../types/IFood.types";
import { addProductToDiet } from "./helpers/addProductToDiet";
import { IStandardResponse } from "../../types/common.types";
dotenv.config();

interface IAddNewDiet {
    studentId: string;
    productPayload: IProductPayload;
}

//TODO pomyslec nad tym, zeby sprawdzac czy student nalezy do danego trenera
export const addNewDiet = async (
    userToken: string,
    userAndProductData: IAddNewDiet
): Promise<IStandardResponse> => {
    try {
        console.log(userAndProductData);

        const { studentId, productPayload } = userAndProductData;

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
        console.log("error", error);

        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
