import { UpdateResult } from "mongodb";
import { mealModel } from "../../../database/models/meal";
import { MEAL_TYPES } from "../../../enums/meal";
import { IProductToDelete } from "../../../types/IFood.types";

export const deleteProperMeal = async (productToDelete: IProductToDelete): Promise<number> => {
    const { allDayMealsId, productId, typeOfMeal } = productToDelete;

    let modified: UpdateResult;

    switch (typeOfMeal) {
        case MEAL_TYPES.BREAKFAST:
            modified = await mealModel.updateOne(
                { _id: allDayMealsId },
                {
                    $pull: { breakfast: { _id: productId } },
                }
            );

            return modified.modifiedCount;
        case MEAL_TYPES.BRUNCH:
            modified = await mealModel.updateOne(
                { _id: allDayMealsId },
                {
                    $pull: { brunch: { _id: productId } },
                }
            );

            return modified.modifiedCount;
        case MEAL_TYPES.DINNER:
            modified = await mealModel.updateOne(
                { _id: allDayMealsId },
                {
                    $pull: { dinner: { _id: productId } },
                }
            );

            return modified.modifiedCount;
        case MEAL_TYPES.DESSERT:
            modified = await mealModel.updateOne(
                { _id: allDayMealsId },
                {
                    $pull: { dessert: { _id: productId } },
                }
            );

            return modified.modifiedCount;
        case MEAL_TYPES.SUPPER:
            modified = await mealModel.updateOne(
                { _id: allDayMealsId },
                {
                    $pull: { supper: { _id: productId } },
                }
            );

            return modified.modifiedCount;
        default:
            return modified.modifiedCount;
    }
};
