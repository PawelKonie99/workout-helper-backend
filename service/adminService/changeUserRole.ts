import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IStandardResponse } from "../../types/common.types";

type IRole = "admin" | "trainer" | "user"; //TODO przeniesc

interface IUserPayload {
    userId: string;
    roleToChange: IRole;
    isRoleActive: boolean;
}

export const changeUserRole = async (
    userToken: string,
    userPayload: IUserPayload
): Promise<IStandardResponse> => {
    try {
        const { isRoleActive, roleToChange, userId } = userPayload;

        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false }; //TODO wszedzie zrobic tak jak tutaj czyli nie wysylac pustego obiektu
        }

        const adminData = await userModel.findById(decodedUser.id);

        if (!adminData.roles.adminRole) {
            return { code: ResponseCode.forbidden, success: false };
        }

        switch (roleToChange) {
            case "trainer":
                await userModel.findByIdAndUpdate(userId, {
                    "roles.trainerRole": isRoleActive,
                });
                break;
            case "admin":
                await userModel.findByIdAndUpdate(userId, {
                    "roles.adminRole": isRoleActive,
                });
                break;
            default:
                break;
        }

        return { code: ResponseCode.success, success: true };
    } catch (error) {
        console.log(error);

        return { code: ResponseCode.badRequest, success: false };
    }
};
