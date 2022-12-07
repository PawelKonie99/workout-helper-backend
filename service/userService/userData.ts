import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { userModel } from "../../database/models/user";
import { IUserDataResponse } from "../../types/IUser.types";
import { studentResourcesModel } from "../../database/models/studentResources";

dotenv.config();

export const getUserData = async (userToken: string): Promise<IUserDataResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }
        const userData = await userModel.findById(decodedUser.id);

        if (!userData.roles.trainerRole) {
            const { studentResourcesId } = await userModel.findById(decodedUser.id);

            const studentData = await studentResourcesModel.findById(studentResourcesId);
            const trainerData = await userModel.findById(studentData?.trainerId?.toString());

            return {
                code: ResponseCode.success,
                success: true,
                username: userData.username,
                trainerName: trainerData?.username,
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
