import { MEAL_TYPES } from "../enums/meal";
import { ResponseCode } from "../enums/responseCode";

export interface IProductPayload {
    typeOfMeal: MEAL_TYPES;
    productName: string;
    kcal: number;
    proteins: number;
    carbons: number;
    fat: number;
}

export interface ISaveProductResponse {
    code: ResponseCode;
    message: string;
    success: boolean;
}
