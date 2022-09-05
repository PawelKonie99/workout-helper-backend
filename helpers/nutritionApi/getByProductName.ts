import dotenv from "dotenv";
import axios from "axios";
import { INutritionProductResponse } from "../../types/IFood.types";
dotenv.config();

export const getByProductName = async (productName: string) => {
    const { NUTRITION_APP_ID, NUTRITION_KEY } = process.env;

    const productData = await axios.post<INutritionProductResponse>(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
            query: productName,
        },
        {
            headers: { "x-app-id": NUTRITION_APP_ID, "x-app-key": NUTRITION_KEY },
        }
    );

    return productData.data.foods;
};
