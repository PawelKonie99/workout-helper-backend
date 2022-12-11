import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IGetAllUsersResponse } from "../../types/IAdmin.types";

export const getAllUsers = async (
    userToken: string,
    offset: number,
    limit: number
): Promise<IGetAllUsersResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false }; //TODO wszedzie zrobic tak jak tutaj czyli nie wysylac pustego obiektu
        }

        const { roles: adminRole, username } = await userModel.findById(decodedUser.id);

        if (!adminRole) {
            return { code: ResponseCode.forbidden, success: false };
        }

        //Get all users except Admin
        const allUsers = await userModel
            .find({ username: { $ne: username } })
            .skip(offset)
            .limit(limit);

        const mappedUsers = allUsers.map(({ roles, username, id }) => ({
            roles,
            username,
            id: id as string,
        }));

        return { code: ResponseCode.success, success: true, usersData: mappedUsers };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
