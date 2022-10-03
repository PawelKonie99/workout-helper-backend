import { Model } from "mongoose";
import { IMealSchema } from "../../../database/models/meal";
import { IUserSchema } from "../../../database/models/user";
import { IDecodedUser } from "../../../types/IUser.types";

interface IAllUserProductsArguments {
    mealModel: Model<IMealSchema>;
    userModel: Model<IUserSchema>;
    decodedUser: IDecodedUser;
}

export const allUserProducts = async ({ mealModel, userModel, decodedUser }: IAllUserProductsArguments) => {
    //Szukamy wszystkich id posilkow uzytkownika
    const userMealsIds = await userModel.findById(decodedUser.id).select("meals").exec();

    //tutaj otrzyujemy tablice z wszystkimi obiektami posilkow
    return await Promise.all(
        userMealsIds.meals.map(async (mealId) => {
            const allProducts = await mealModel.findById(mealId);

            return allProducts;
        })
    );
};
