import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import dotenv from "dotenv";
import { studentResourcesModel } from "../../database/models/studentResources";
import { trainerResourcesModel } from "../../database/models/trainerResources";
import { IStandardResponse } from "../../types/common.types";
dotenv.config();

export const deleteTrainer = async (userToken: string): Promise<IStandardResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return {
                code: ResponseCode.badRequest,
                success: false,
                message: "Uzytkownik nie został rozpoznany",
            }; //TODO ujednolicic message jak nie znajdzie sie usera
        }

        const { studentResourcesId } = await userModel.findById(decodedUser.id);

        const studentData = await studentResourcesModel.findById(studentResourcesId);
        const { trainerResourcesId } = await userModel.findById(studentData.trainerId);

        await trainerResourcesModel.findByIdAndUpdate(trainerResourcesId, {
            $pull: { students: decodedUser.id },
        });

        await studentResourcesModel.findByIdAndUpdate(studentResourcesId, {
            $unset: { trainerId: "" },
        });

        return { code: ResponseCode.success, success: true, message: "Trener usuniety pomyślnie" };
    } catch (error) {
        console.log(error);

        return { code: ResponseCode.badRequest, success: false, message: "Wystapił bład" };
    }
};
