import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IAddNewTrainingPlanPayload } from "../../types/ITrainer.types";
import { studentModel } from "../../database/models/student";
import { IStandardResponse } from "../../types/common.types";
dotenv.config();

export const addNewTrainingPlan = async (
    newTrainingPayload: IAddNewTrainingPlanPayload,
    userToken: string
): Promise<IStandardResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);
        const {
            userData: { id },
            workoutData,
        } = newTrainingPayload;

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, message: "User not found", success: false };
        }

        await studentModel.findByIdAndUpdate(id, {
            trainingPlan: workoutData,
        });

        return {
            code: ResponseCode.success,
            message: "Training plan saved successfully",
            success: true,
        };
    } catch (error) {
        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
