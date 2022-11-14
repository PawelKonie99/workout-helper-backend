import { UpdateResult } from "mongodb";
import { studentModel } from "../../../database/models/student";
import { MEAL_TYPES } from "../../../enums/meal";
import { IRemoveDietProductPayload } from "../../../types/ITrainer.types";

export const deleteProductFromDiet = async (
    studentId: string,
    productToRemove: IRemoveDietProductPayload
) => {
    const { typeOfMeal, productId } = productToRemove;

    let modified: UpdateResult;

    switch (typeOfMeal) {
        case MEAL_TYPES.BREAKFAST:
            modified = await studentModel.updateOne(
                { _id: studentId },
                {
                    $pull: { "diet.breakfast": { _id: productId } },
                }
            );

            return modified.modifiedCount;
        case MEAL_TYPES.BRUNCH:
            modified = await studentModel.updateOne(
                { _id: studentId },
                {
                    $pull: { "diet.brunch": { _id: productId } },
                }
            );

            return modified.modifiedCount;
        case MEAL_TYPES.DINNER:
            modified = await studentModel.updateOne(
                { _id: studentId },
                {
                    $pull: { "diet.dinner": { _id: productId } },
                }
            );

            return modified.modifiedCount;
        case MEAL_TYPES.DESSERT:
            modified = await studentModel.updateOne(
                { _id: studentId },
                {
                    $pull: { "diet.dessert": { _id: productId } },
                }
            );

            return modified.modifiedCount;
        case MEAL_TYPES.SUPPER:
            modified = await studentModel.updateOne(
                { _id: studentId },
                {
                    $pull: { "diet.supper": { _id: productId } },
                }
            );

            return modified.modifiedCount;
            break;
        default:
            break;
    }
};
