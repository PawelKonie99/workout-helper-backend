import { MEAL_TYPES } from "../../../enums/meal";
import { ITodayProducts } from "../../../types/IFood.types";

export const sumMealProductsData = (todayUserProducts: ITodayProducts, timeOfMeal: MEAL_TYPES) => {
    const sumOfProductsData = {
        kcal: 0,
        proteins: 0,
        carbons: 0,
        fat: 0,
    };

    todayUserProducts[timeOfMeal].forEach((product) => {
        sumOfProductsData.carbons = sumOfProductsData.carbons + Number(product.carbons);
        sumOfProductsData.kcal = sumOfProductsData.kcal + Number(product.kcal);
        sumOfProductsData.proteins = sumOfProductsData.proteins + Number(product.proteins);
        sumOfProductsData.fat = sumOfProductsData.fat + Number(product.fat);
    });

    return sumOfProductsData;
};
