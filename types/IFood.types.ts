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

export interface IDeleteProductResponse {
    code: ResponseCode;
    success: boolean;
}

export interface IAllProductsResponse {
    code: ResponseCode;
    success: boolean;
    allUserProducts?:
        | {
              mealDate: string;
              breakfast: IDatabaseProduct[];
              brunch: IDatabaseProduct[];
              dinner: IDatabaseProduct[];
              dessert: IDatabaseProduct[];
              supper: IDatabaseProduct[];
          }[]
        | [];
}
export interface ITodayProductsResponse {
    code: ResponseCode;
    success: boolean;
    todayUserProducts?: ITodayProducts | Record<string, never>;
    dailySummary?: IProductsSummary | Record<string, never>;
}

export interface ITodayProducts {
    mealDate?: string;
    breakfast: IDatabaseProduct[];
    brunch: IDatabaseProduct[];
    dinner: IDatabaseProduct[];
    dessert: IDatabaseProduct[];
    supper: IDatabaseProduct[];
}

export interface IMealHistoryResponse {
    mealHistory?:
        | {
              dailySummary: IProductsSummary;
              mealDate: string;
              breakfast: IMealMacros;
              brunch: IMealMacros;
              dinner: IMealMacros;
              dessert: IMealMacros;
              supper: IMealMacros;
          }[]
        | [];
    code: ResponseCode;
    success: boolean;
}

export interface IProductsSummary {
    totalKcal: number;
    totalProteins: number;
    totalFat: number;
    totalCarbons: number;
}

export interface IMealMacros {
    kcal: number;
    proteins: number;
    carbons: number;
    fat: number;
}

export interface IProductToDelete {
    allDayMealsId: string;
    productId: string;
    typeOfMeal: MEAL_TYPES;
}
