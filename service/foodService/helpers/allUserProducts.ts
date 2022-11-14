import { Model } from "mongoose";
import { IMealSchema } from "../../../database/models/meal";
import { IUserSchema } from "../../../database/models/user";

interface IAllUserProductsArguments {
    mealModel: Model<IMealSchema>;
    userModel: Model<IUserSchema>;
    userId: string;
}

export const allUserProducts = async ({ mealModel, userModel, userId }: IAllUserProductsArguments) => {
    //Szukamy wszystkich id posilkow uzytkownika
    const userMealsIds = await userModel.findById(userId).select("meals").exec();

    //tutaj otrzyujemy tablice z wszystkimi obiektami posilkow
    return await Promise.all(
        userMealsIds.meals.map(async (mealId) => {
            const allProducts = await mealModel.findById(mealId);

            return allProducts;
        })
    );
};
