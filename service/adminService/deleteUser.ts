import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IStandardResponse } from "../../types/common.types";

interface IUserPayload {
    userIdToRemove: string;
}

export const deleteUser = async (
    userToken: string,
    userPayload: IUserPayload
): Promise<IStandardResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false }; //TODO wszedzie zrobic tak jak tutaj czyli nie wysylac pustego obiektu
        }

        const adminData = await userModel.findById(decodedUser.id);

        if (!adminData.roles.adminRole) {
            return { code: ResponseCode.forbidden, success: false };
        }

        const deletedUser = await userModel.deleteOne({ _id: userPayload.userIdToRemove });

        if (deletedUser.deletedCount === 1) {
            return { code: ResponseCode.success, success: true, message: "Uzytkownik usuniety pomyślnie" };
        }
    } catch (error) {
        console.log(error);

        return { code: ResponseCode.badRequest, success: false };
    }
};
