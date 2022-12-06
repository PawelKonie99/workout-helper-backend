import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { userModel } from "../../database/models/user";
import { studentResourcesModel } from "../../database/models/studentResources";
import { IGetTrainerRequestResponse } from "../../types/IStudent.types";

dotenv.config();

export const getTrainerRequest = async (userToken: string): Promise<IGetTrainerRequestResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const { studentResourcesId } = await userModel.findById(decodedUser.id);

        const studentData = await studentResourcesModel.findById(studentResourcesId);

        if (!studentData.requestedTrainers) {
            return { code: ResponseCode.success, success: true, requestedTrainers: [] };
        }

        const allRequestedTrainers = await Promise.all(
            studentData.requestedTrainers.map(async (requestedTrainerId) => {
                const allRequestedTrainersData = await userModel.findById(requestedTrainerId);

                return allRequestedTrainersData;
            })
        );

        const allTrainersData = allRequestedTrainers.map(({ username, id }) => {
            return { username, id };
        });

        return { code: ResponseCode.success, success: true, requestedTrainers: allTrainersData };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
