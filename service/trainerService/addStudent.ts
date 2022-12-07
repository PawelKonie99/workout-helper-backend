import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IStudentPayload } from "../../types/ITrainer.types";
import { trainerResourcesModel } from "../../database/models/trainerResources";
import { studentResourcesModel } from "../../database/models/studentResources";

import { IStandardResponse } from "../../types/common.types";
import { getStudentIdByStudentName } from "../../helpers/getStudentIdByStudentName";
import { userModel } from "../../database/models/user";
dotenv.config();

export const addStudent = async (
    studentPayload: IStudentPayload,
    userToken: string
): Promise<IStandardResponse> => {
    try {
        const { studentName } = studentPayload;

        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, message: "User not found", success: false };
        }

        const { trainerResourcesId, id } = await userModel.findById(decodedUser.id);

        if (!trainerResourcesId) {
            return { code: ResponseCode.success, message: "Trainer not found", success: false };
        }

        const studentId = await getStudentIdByStudentName(studentName);
        const { studentResourcesId } = await userModel.findById(studentId);

        if (!studentId) {
            return { code: ResponseCode.success, message: "User not found", success: false };
        }

        const trainerData = await trainerResourcesModel.findById(trainerResourcesId);

        const isUserAlreadyRequested = trainerData?.requestedStudents.find(
            (trainerId) => trainerId.valueOf() === studentId.valueOf()
        );

        if (isUserAlreadyRequested) {
            return { code: ResponseCode.success, message: "User alredy added", success: false };
        }

        await trainerResourcesModel.findByIdAndUpdate(trainerResourcesId, {
            $push: { requestedStudents: studentId },
            // $push: { students: studentId },
        });

        await studentResourcesModel.findByIdAndUpdate(studentResourcesId, {
            $push: { requestedTrainers: decodedUser.id },
            // trainerId: id,
        });

        return {
            code: ResponseCode.success,
            message: "Student saved successfully",
            success: true,
        };
    } catch (error) {
        console.log("error", error);

        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
