import dotenv from "dotenv";
import { mealModel } from "../../database/models/meal";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IProductPayload, ISaveProductResponse } from "../../types/IFood.types";
import { saveProperMeal } from "./helpers/saveProperMeal";

dotenv.config();

export const saveProductToDb = async (
    productPayload: IProductPayload,
    userToken: string
): Promise<ISaveProductResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.badRequest, message: "User not found", success: false };
        }

        const date = new Date().toLocaleDateString();
        // const date = new Date(Date.now() - 86400000).toLocaleDateString();

        //Szukamy wszystkich id posilkow uzytkownika
        const userMealsIds = await userModel.findById(decodedUser.id).select("meals").exec();

        //tutaj otrzyujemy tablice z wszystkimi obiektami posilkow
        const allUserProducts = await Promise.all(
            userMealsIds.meals.map(async (mealId) => {
                const workout = await mealModel.findById(mealId);

                return workout;
            })
        );

        //Szukamy posilkow z dzisiejszego dnia
        const isAllDayMealFound = allUserProducts.find(({ allDayMeals }) => allDayMeals.mealDate === date);

        //Wymyslilem to tak, ze wpierw zapisujemy pusty obiekt z posilkami z calego dnia a nastepnie dopushowywac do istniejacego juz obiektu
        //Aktualnie tutaj wszystko dziala ale update powyzej jest z łapy, prawdopodobnie trzeba bedzie zrobic switcha i w zaleznosci
        //ktory posilek przyjdzie w body requesta tego bedziemy updateowac
        const newAllDayMeal = new mealModel({
            allDayMeals: {
                mealDate: date,
                breakfast: [],
                brunch: [],
                dinner: [],
                dessert: [],
                supper: [],
            },
        });

        //Jezeli posilkow z danego dnia nie ma w bazie to wtedy tworzymy pusty obiekt
        if (!isAllDayMealFound) {
            const savedAllDayMeal = await newAllDayMeal.save();

            await userModel.findByIdAndUpdate(decodedUser.id, {
                $push: { meals: savedAllDayMeal },
            });

            return {
                code: ResponseCode.success,
                message: "Product saved successfully to databse",
                success: true,
            };
        }

        await saveProperMeal(productPayload, mealModel, isAllDayMealFound._id);

        return {
            code: ResponseCode.success,
            message: "Product saved successfully to databse",
            success: true,
        };
    } catch (error) {
        console.log("error", error);

        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
