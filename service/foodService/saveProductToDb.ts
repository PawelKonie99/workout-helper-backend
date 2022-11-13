import dotenv from "dotenv";
import { mealModel } from "../../database/models/meal";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IStandardResponse } from "../../types/common.types";
import { IProductPayload } from "../../types/IFood.types";
import { allUserProducts } from "./helpers/allUserProducts";
import { saveProperMeal } from "./helpers/saveProperMeal";

dotenv.config();

export const saveProductToDb = async (
    productPayload: IProductPayload,
    userToken: string
): Promise<IStandardResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, message: "User not found", success: false };
        }

        const date = new Date().toLocaleDateString();
        // const date = new Date(Date.now() - 86400000).toLocaleDateString();

        const getAllUserProducts = await allUserProducts({ mealModel, userModel, userId: decodedUser.id });

        //Szukamy posilkow z dzisiejszego dnia
        const isAllDayMealFound = getAllUserProducts.find((allProducts) => allProducts?.mealDate === date);

        //Jezeli posilkow z danego dnia nie ma w bazie to wtedy tworzymy pusty obiekt
        if (!isAllDayMealFound) {
            //Wymyslilem to tak, ze wpierw zapisujemy pusty obiekt z posilkami z calego dnia a nastepnie dopushowywac do istniejacego juz obiektu
            //Aktualnie tutaj wszystko dziala ale update powyzej jest z łapy, prawdopodobnie trzeba bedzie zrobic switcha i w zaleznosci
            //ktory posilek przyjdzie w body requesta tego bedziemy updateowac
            const { typeOfMeal, kcal, proteins, carbons, fat, productName } = productPayload;
            const newAllDayMeal = new mealModel({
                mealDate: date,
                breakfast: [],
                brunch: [],
                dinner: [],
                dessert: [],
                supper: [],
            });

            //Do pustego obiektu dodajemy to co chcial dodac uzytkownik
            newAllDayMeal[typeOfMeal].push({
                productName,
                kcal: kcal.toString(),
                proteins: proteins.toString(),
                carbons: carbons.toString(),
                fat: fat.toString(),
            });

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
