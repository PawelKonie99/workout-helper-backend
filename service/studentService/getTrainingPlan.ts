import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { getStudentByStudentId } from "../../helpers/getStudentByStudentId";
import { tokenAuth } from "../../helpers/tokenAuth";
import dotenv from "dotenv";
import { ITrainingPlanResponse } from "../../types/IStudent.types";
dotenv.config();

export const getTrainingPlan = async (userToken: string): Promise<ITrainingPlanResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.badRequest, success: false };
        }

        const { student } = await userModel.findById(decodedUser.id).select("student").exec();

        const studentData = await getStudentByStudentId(student.toString());

        if (!studentData.trainingPlan) {
            return { code: ResponseCode.success, success: true, trainingPlan: [] };
        }

        const trainingPlan = studentData.trainingPlan;

        return { code: ResponseCode.success, success: true, trainingPlan };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
