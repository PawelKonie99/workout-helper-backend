import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { userModel } from "../../database/models/user";
import { getStudentByStudentId } from "../../helpers/getStudentByStudentId";
import { getTrainerByTrainerId } from "../../helpers/getTrainerByTrainerId";
import { IUserDataResponse } from "../../types/IUser.types";

dotenv.config();

export const getUserData = async (userToken: string): Promise<IUserDataResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }
        const userData = await userModel.findById(decodedUser.id);

        if (!userData.isTrainer) {
            const { student } = await userModel.findById(decodedUser.id).select("student").exec();

            const studentData = await getStudentByStudentId(student.toString());
            const trainerData = await getTrainerByTrainerId(studentData?.trainer?.toString());

            return {
                code: ResponseCode.success,
                success: true,
                username: userData.username,
                trainerName: trainerData?.trainerName,
            };
        }

        return {
            code: ResponseCode.success,
            success: true,
            username: userData.username,
        };
    } catch (error) {
        console.log("error", error);

        return { code: ResponseCode.badRequest, success: false };
    }
};
