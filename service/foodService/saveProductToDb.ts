import dotenv from "dotenv";
import { mealModel } from "../../database/models/meal";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { formatDate } from "../../helpers/formatDate";
import { tokenAuth } from "../../helpers/tokenAuth";

dotenv.config();

export const saveProductToDb = async (jakisObject: any, userToken: string): Promise<any> => {
    try {
        const { breakfast, brunch, dinner, dessert, supper } = jakisObject;

        const decodedUser = tokenAuth(userToken);

        const date = formatDate(new Date());

        //Tutaj szukam po dacie czy posilki z tego dnia sa juz w bazie
        const allDayMealFound = await mealModel.findOneAndUpdate(
            { "allDayMeals.date": date },
            { $push: { "allDayMeals.breakfast": { kcal: "3", proteins: "3", carbons: "3", fat: "3" } } }
        );

        //Wymyslilem to tak, ze wpierw zapisujemy pusty obiekt z posilkami z calego dnia a nastepnie dopushowywac to istniejacego juz obiektu
        //Aktualnie tutaj wszystko dziala ale update powyzej jest z łapy, prawdopodobnie trzeba bedzie zrobic switcha i w zaleznosci
        //ktory posilek przyjdzie w body requesta tego bedziemy updateowac
        const newAllDayMeal = new mealModel({
            allDayMeals: {
                date: date,
                breakfast: [],
                brunch: [],
                dinner: [],
                dessert: [],
                supper: [],
            },
        });

        console.log("allDayMealFound", allDayMealFound);

        //Jezeli posilkow z danego dnia nie ma w bazie to wtedy tworzymy pusty obiekt
        if (allDayMealFound === null) {
            const savedAllDayMeal = await newAllDayMeal.save();

            await userModel.findByIdAndUpdate(decodedUser.id, {
                $push: { meal: savedAllDayMeal },
            });
        }

        return { code: ResponseCode.success, success: true };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
