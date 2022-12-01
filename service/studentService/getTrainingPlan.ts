import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import dotenv from "dotenv";
import { ITrainingPlanResponse } from "../../types/IStudent.types";
import { studentResourcesModel } from "../../database/models/studentResources";
dotenv.config();

export const getTrainingPlan = async (userToken: string): Promise<ITrainingPlanResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.badRequest, success: false };
        }

        const { studentResourcesId } = await userModel.findById(decodedUser.id);

        const studentData = await studentResourcesModel.findById(studentResourcesId);

        if (!studentData.trainingPlan) {
            return { code: ResponseCode.success, success: true, trainingPlan: [] };
        }

        const trainingPlan = studentData.trainingPlan;

        return { code: ResponseCode.success, success: true, trainingPlan };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
