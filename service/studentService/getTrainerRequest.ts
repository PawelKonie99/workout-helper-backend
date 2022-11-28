import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IGetStudenDietResponse } from "../../types/IStudent.types";
import { userModel } from "../../database/models/user";
import { getStudentByStudentId } from "../../helpers/getStudentByStudentId";
import { fullDailyMealData } from "../foodService/helpers/fullDailyMealData";
dotenv.config();

export const getTrainerRequest = async (userToken: string): Promise<IGetStudenDietResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const { student } = await userModel.findById(decodedUser.id).select("student").exec();

        const studentData = await getStudentByStudentId(student.toString());

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
