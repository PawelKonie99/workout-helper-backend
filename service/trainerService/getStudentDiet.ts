import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { studentResourcesModel } from "../../database/models/studentResources";
import { IGetStudenDietResponse } from "../../types/IStudent.types";
import { userModel } from "../../database/models/user";
dotenv.config();

//TODO pomyslec nad tym, zeby sprawdzac czy student nalezy do danego trenera
export const getStudentDiet = async (
    userToken: string,
    studentId: string
): Promise<IGetStudenDietResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const { studentResourcesId } = await userModel.findById(studentId);

        const { diet } = await studentResourcesModel.findById(studentResourcesId).select("diet").exec();

        return { code: ResponseCode.success, success: true, diet };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
