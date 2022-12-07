import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IAddNewTrainingPlanPayload } from "../../types/ITrainer.types";
import { studentResourcesModel } from "../../database/models/studentResources";
import { IStandardResponse } from "../../types/common.types";
import { userModel } from "../../database/models/user";
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

        const { studentResourcesId } = await userModel.findById(id);

        await studentResourcesModel.findByIdAndUpdate(studentResourcesId, {
            trainingPlan: workoutData,
        });

        return {
            code: ResponseCode.success,
            message: "Training plan saved successfully",
            success: true,
        };
    } catch (error) {
        console.log(error);

        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
