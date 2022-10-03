import { Model } from "mongoose";
import { IMealSchema } from "../../../database/models/meal";
import { MEAL_TYPES } from "../../../enums/meal";
import { IProductPayload } from "../../../types/IFood.types";

export const saveProperMeal = async (
    productPayload: IProductPayload,
    mealModel: Model<IMealSchema>,
    id: string
) => {
    const { typeOfMeal, kcal, proteins, carbons, fat, productName } = productPayload;

    switch (typeOfMeal) {
        case MEAL_TYPES.BREAKFAST:
            //TO mozna rozbic do osobnej funkcji w sensie to findByIdAndUpdate. bo sie powtarza tutaj
            await mealModel.findByIdAndUpdate(id, {
                $push: {
                    breakfast: {
                        kcal,
                        proteins,
                        carbons,
                        fat,
                        productName,
                    },
                },
            });
            break;
        case MEAL_TYPES.BRUNCH:
            await mealModel.findByIdAndUpdate(id, {
                $push: {
                    brunch: {
                        kcal,
                        proteins,
                        carbons,
                        fat,
                        productName,
                    },
                },
            });
            break;
        case MEAL_TYPES.DINNER:
            await mealModel.findByIdAndUpdate(id, {
                $push: {
                    dinner: {
                        kcal,
                        proteins,
                        carbons,
                        fat,
                        productName,
                    },
                },
            });
            break;
        case MEAL_TYPES.DESSERT:
            await mealModel.findByIdAndUpdate(id, {
                $push: {
                    dessert: {
                        kcal,
                        proteins,
                        carbons,
                        fat,
                        productName,
                    },
                },
            });
            break;
        case MEAL_TYPES.SUPPER:
            await mealModel.findByIdAndUpdate(id, {
                $push: {
                    supper: {
                        kcal,
                        proteins,
                        carbons,
                        fat,
                        productName,
                    },
                },
            });
            break;
        default:
            break;
    }
};
