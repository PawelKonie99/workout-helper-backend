import { MEAL_TYPES } from "../../../enums/meal";
import { ITodayProducts } from "../../../types/IFood.types";
import { sumMealProductsData } from "./sumMealProductsData";

interface IArgs {
    products: ITodayProducts;
}

export const fullDailyMealData = ({ products }: IArgs) => {
    const { BREAKFAST, BRUNCH, DESSERT, DINNER, SUPPER } = MEAL_TYPES;

    const summedProductsData = {
        breakfast: sumMealProductsData(products, BREAKFAST),
        brunch: sumMealProductsData(products, BRUNCH),
        dinner: sumMealProductsData(products, DINNER),
        dessert: sumMealProductsData(products, DESSERT),
        supper: sumMealProductsData(products, SUPPER),
    };

    const { breakfast, brunch, dinner, dessert, supper } = summedProductsData;

    const dailySummary = {
        totalKcal: breakfast.kcal + brunch.kcal + dinner.kcal + dessert.kcal + supper.kcal,
        totalProteins:
            breakfast.proteins + brunch.proteins + dinner.proteins + dessert.proteins + supper.proteins,
        totalFat: breakfast.fat + brunch.fat + dinner.fat + dessert.fat + supper.fat,
        totalCarbons: breakfast.carbons + brunch.carbons + dinner.carbons + dessert.carbons + supper.carbons,
    };

    return { breakfast, brunch, dinner, dessert, supper, dailySummary };
};
