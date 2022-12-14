import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IGetSingleUserResponse } from "../../types/IAdmin.types";

export const getSingleUserData = async (
    userToken: string,
    userId: string
): Promise<IGetSingleUserResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false }; //TODO wszedzie zrobic tak jak tutaj czyli nie wysylac pustego obiektu
        }

        const { roles: adminRole } = await userModel.findById(decodedUser.id);

        if (!adminRole) {
            return { code: ResponseCode.forbidden, success: false };
        }

        //Get all users except Admin
        const foundedUser = await userModel.findById(userId);

        const parsedUserData = {
            roles: foundedUser.roles,
            username: foundedUser.username,
            id: foundedUser.id as string,
        };

        return { code: ResponseCode.success, success: true, parsedUserData };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
