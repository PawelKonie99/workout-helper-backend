import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { userModel } from "../../database/models/user";
import { studentResourcesModel } from "../../database/models/studentResources";
import { IUserDecisionPayload, IUserDecisionResponse } from "../../types/IStudent.types";
import { trainerResourcesModel } from "../../database/models/trainerResources";
import { MANAGE_REQUESTED_TRAINERS } from "../../enums/userDecision";
dotenv.config();

export const studentTrainerDecision = async (
    studentDecisionPayload: IUserDecisionPayload,
    userToken: string
): Promise<IUserDecisionResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);
        const { trainerId, userDecision } = studentDecisionPayload;

        if (!decodedUser) {
            return {
                code: ResponseCode.unauthorized,
                success: false,
                message: "Uzytkownik nie został rozpoznany",
                trainerName: "",
            };
        }

        const { studentResourcesId } = await userModel.findById(decodedUser.id);
        const { trainerResourcesId, username } = await userModel.findById(trainerId);

        await trainerResourcesModel.findByIdAndUpdate(trainerResourcesId, {
            $pull: { requestedStudents: decodedUser.id },
        });

        await studentResourcesModel.findByIdAndUpdate(studentResourcesId, {
            $pull: { requestedTrainers: trainerId },
        });

        if (userDecision === MANAGE_REQUESTED_TRAINERS.ACCEPT) {
            await trainerResourcesModel.findByIdAndUpdate(trainerResourcesId, {
                $push: { students: decodedUser.id },
            });

            await studentResourcesModel.findByIdAndUpdate(studentResourcesId, {
                trainerId,
            });

            return {
                code: ResponseCode.success,
                success: true,
                message: "Trener został zaakceptowany",
                trainerName: username,
            };
        }

        return {
            code: ResponseCode.success,
            success: true,
            message: "Trener został odrzucony",
            trainerName: "",
        };
    } catch (error) {
        return {
            code: ResponseCode.badRequest,
            success: false,
            message: "błąd podczas dodawania/odrzucania trenera",
            trainerName: "",
        };
    }
};
