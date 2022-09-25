import { Model } from "mongoose";
import { IMealSchema } from "../../../database/models/meal";
import { MEAL_TYPES } from "../../../enums/meal";
import { IProductPayload } from "../../../types/IFood.types";

export const saveProperMeal = async (
    productPayload: IProductPayload,
    mealModel: Model<IMealSchema>,
    date: string
) => {
    const { typeOfMeal, kcal, proteins, carbons, fat, productName } = productPayload;

    switch (typeOfMeal) {
        case MEAL_TYPES.BREAKFAST:
            await mealModel.findOneAndUpdate(
                { "allDayMeals.mealDate": date },
                {
                    $push: {
                        "allDayMeals.breakfast": {
                            kcal,
                            proteins,
                            carbons,
                            fat,
                            productName,
                        },
                    },
                }
            );
            break;
        case MEAL_TYPES.BRUNCH:
            await mealModel.findOneAndUpdate(
                { "allDayMeals.mealDate": date },
                {
                    $push: {
                        "allDayMeals.brunch": {
                            kcal,
                            proteins,
                            carbons,
                            fat,
                            productName,
                        },
                    },
                }
            );
            break;
        case MEAL_TYPES.DINNER:
            await mealModel.findOneAndUpdate(
                { "allDayMeals.mealDate": date },
                {
                    $push: {
                        "allDayMeals.dinner": {
                            kcal,
                            proteins,
                            carbons,
                            fat,
                            productName,
                        },
                    },
                }
            );
            break;
        case MEAL_TYPES.DESSERT:
            await mealModel.findOneAndUpdate(
                { "allDayMeals.mealDate": date },
                {
                    $push: {
                        "allDayMeals.dessert": {
                            kcal,
                            proteins,
                            carbons,
                            fat,
                            productName,
                        },
                    },
                }
            );
            break;
        case MEAL_TYPES.SUPPER:
            await mealModel.findOneAndUpdate(
                { "allDayMeals.mealDate": date },
                {
                    $push: {
                        "allDayMeals.supper": {
                            kcal,
                            proteins,
                            carbons,
                            fat,
                            productName,
                        },
                    },
                }
            );
            break;
        default:
            break;
    }
};
