import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { studentModel } from "../../database/models/student";
import { IGetStudenDietResponse } from "../../types/IStudent.types";
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

        const { diet } = await studentModel.findById(studentId).select("diet").exec();

        return { code: ResponseCode.success, success: true, diet };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
