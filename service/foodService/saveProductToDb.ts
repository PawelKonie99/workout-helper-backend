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

        const date = new Date().toLocaleDateString();
        // const date = new Date(Date.now() - 86400000).toLocaleDateString();

        const isAllDayMealFound = await mealModel.findOne({ "allDayMeals.mealDate": date });

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
        if (isAllDayMealFound === null) {
            const savedAllDayMeal = await newAllDayMeal.save();

            console.log("nie znaleziono");

            await userModel.findByIdAndUpdate(decodedUser.id, {
                $push: { meal: savedAllDayMeal },
            });
        }

        await saveProperMeal(productPayload, mealModel, date);

        return {
            code: ResponseCode.success,
            message: "Product saved successfully to databse",
            success: true,
        };
    } catch (error) {
        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
