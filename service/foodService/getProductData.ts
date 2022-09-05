import dotenv from "dotenv";
import { ResponseCode } from "../../enums/responseCode";
import { getByProductName } from "../../helpers/nutritionApi/getByProductName";
import { IGetProductDataResponse } from "../../types/IFood.types";
dotenv.config();

export const getProductData = async (productName: string): Promise<IGetProductDataResponse> => {
    try {
        const productData = await getByProductName(productName);

        return { code: ResponseCode.success, success: true, productData };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
