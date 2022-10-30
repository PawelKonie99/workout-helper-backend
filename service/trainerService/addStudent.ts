import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IStudentPayload } from "../../types/ITrainer.types";
dotenv.config();

export const addStudent = async (studentPayload: IStudentPayload, userToken: string): Promise<any> => {
    try {
        const { studentName } = studentPayload;

        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.badRequest, message: "User not found", success: false }; //TODO poprawic kod na 200 chyba
        }

        const student = await userModel.findOne({ username: studentName });

        if (!student) {
            return { code: ResponseCode.badRequest, message: "Student not found", success: false };
        }

        await userModel.findByIdAndUpdate(decodedUser.id, {
            $push: { students: student.id },
        });

        return {
            code: ResponseCode.success,
            message: "Student saved successfully",
            success: true,
        };
    } catch (error) {
        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
