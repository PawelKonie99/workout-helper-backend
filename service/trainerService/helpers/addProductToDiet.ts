import { studentResourcesModel } from "../../../database/models/studentResources";
import { MEAL_TYPES } from "../../../enums/meal";
import { IProductPayload } from "../../../types/IFood.types";

export const addProductToDiet = async (studentId: string, productPayload: IProductPayload) => {
    const { typeOfMeal, kcal, proteins, carbons, fat, productName } = productPayload;

    switch (typeOfMeal) {
        case MEAL_TYPES.BREAKFAST:
            await studentResourcesModel.updateOne(
                {
                    _id: studentId,
                },
                {
                    $push: {
                        "diet.breakfast": {
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
            await studentResourcesModel.updateOne(
                {
                    _id: studentId,
                },
                {
                    $push: {
                        "diet.brunch": {
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
            await studentResourcesModel.updateOne(
                {
                    _id: studentId,
                },
                {
                    $push: {
                        "diet.dinner": {
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
            await studentResourcesModel.updateOne(
                {
                    _id: studentId,
                },
                {
                    $push: {
                        "diet.dessert": {
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
            await studentResourcesModel.updateOne(
                {
                    _id: studentId,
                },
                {
                    $push: {
                        "diet.supper": {
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
