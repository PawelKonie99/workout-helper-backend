import { MEAL_TYPES } from "../enums/meal";
import { ResponseCode } from "../enums/responseCode";

export interface IProductPayload extends IProduct {
    typeOfMeal: MEAL_TYPES;
}

export interface IProduct {
    productName: string;
    kcal: number;
    proteins: number;
    carbons: number;
    fat: number;
}

export interface IDatabaseProduct {
    productName: string;
    kcal: string;
    proteins: string;
    carbons: string;
    fat: string;
}

export interface ISaveProductResponse {
    code: ResponseCode;
    message: string;
    success: boolean;
}

export interface IAllProductsResponse {
    code: ResponseCode;
    success: boolean;
    allUserProducts?: {
        allDayMeals: {
            mealDate: string;
            breakfast: IDatabaseProduct[];
            brunch: IDatabaseProduct[];
            dinner: IDatabaseProduct[];
            dessert: IDatabaseProduct[];
            supper: IDatabaseProduct[];
        };
    }[];
}
