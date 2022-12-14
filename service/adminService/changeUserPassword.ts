import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IStandardResponse } from "../../types/common.types";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

interface IUserPayload {
    userId: string;
    newPassword: string;
}

export const changeUserPassword = async (
    userToken: string,
    userPayload: IUserPayload
): Promise<IStandardResponse> => {
    try {
        const { userId, newPassword } = userPayload;

        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false }; //TODO wszedzie zrobic tak jak tutaj czyli nie wysylac pustego obiektu
        }

        const adminData = await userModel.findById(decodedUser.id);

        if (!adminData.roles.adminRole) {
            return { code: ResponseCode.forbidden, success: false };
        }

        const { SALT_ROUNDS } = process.env;
        const passwordHash = await bcrypt.hash(newPassword, parseInt(SALT_ROUNDS));

        await userModel.findByIdAndUpdate(userId, {
            passwordHash,
        });

        return { code: ResponseCode.success, success: true };
    } catch (error) {
        console.log(error);

        return { code: ResponseCode.badRequest, success: false };
    }
};
