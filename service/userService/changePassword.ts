import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IStandardResponse } from "../../types/common.types";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

interface IUserPassword {
    newPassword: string;
}

export const changePassword = async (
    userToken: string,
    userPayload: IUserPassword
): Promise<IStandardResponse> => {
    try {
        const { newPassword } = userPayload;

        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false }; //TODO wszedzie zrobic tak jak tutaj czyli nie wysylac pustego obiektu
        }

        const { SALT_ROUNDS } = process.env;
        const passwordHash = await bcrypt.hash(newPassword, parseInt(SALT_ROUNDS));

        await userModel.findByIdAndUpdate(decodedUser.id, {
            passwordHash,
        });

        return { code: ResponseCode.success, success: true, message: "Hasło zmienione pomyślnie" };
    } catch (error) {
        console.log(error);

        return { code: ResponseCode.badRequest, success: false };
    }
};
