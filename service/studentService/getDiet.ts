import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IGetStudenDietResponse } from "../../types/IStudent.types";
import { userModel } from "../../database/models/user";
import { fullDailyMealData } from "../foodService/helpers/fullDailyMealData";
import { studentResourcesModel } from "../../database/models/studentResources";
dotenv.config();

//TODO pomyslec nad tym, zeby sprawdzac czy student nalezy do danego trenera
export const getDiet = async (userToken: string): Promise<IGetStudenDietResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const { studentResourcesId } = await userModel.findById(decodedUser.id);

        const studentData = await studentResourcesModel.findById(studentResourcesId);

        if (!studentData.diet) {
            return { code: ResponseCode.success, success: true, diet: {} };
        }

        const { dailySummary } = fullDailyMealData({
            products: studentData?.diet,
        });

        const dietResponse = { ...studentData?.diet, dailySummary };

        return { code: ResponseCode.success, success: true, diet: dietResponse };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
