import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IAddStudentResponse, IStudentPayload } from "../../types/ITrainer.types";
import { trainerModel } from "../../database/models/trainer";
import { studentModel } from "../../database/models/student";
import { getStudentIdByUserId } from "./helpers/getStudentIdByUserId";
import { getTrainerIdByUserId } from "./helpers/getTrainerIdByUserId";
dotenv.config();

export const addStudent = async (
    studentPayload: IStudentPayload,
    userToken: string
): Promise<IAddStudentResponse> => {
    try {
        const { studentName } = studentPayload;

        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.success, message: "User not found", success: false };
        }

        const trainer = await getTrainerIdByUserId(decodedUser.id);

        if (!trainer) {
            return { code: ResponseCode.success, message: "Trainer not found", success: false };
        }

        const student = await getStudentIdByUserId(studentName);

        if (!student) {
            return { code: ResponseCode.success, message: "User not found", success: false };
        }

        await trainerModel.findByIdAndUpdate(trainer, {
            $push: { students: student },
        });

        await studentModel.findByIdAndUpdate(student, {
            trainer: trainer,
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
