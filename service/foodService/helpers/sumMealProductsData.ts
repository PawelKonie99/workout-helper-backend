import { ITodayProducts } from "../../../types/IFood.types";

export const sumMealProductsData = (
    todayUserProducts: ITodayProducts,
    //TODO dac do enum
    timeOfMeal: "breakfast" | "brunch" | "dinner" | "dessert" | "supper"
) => {
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
