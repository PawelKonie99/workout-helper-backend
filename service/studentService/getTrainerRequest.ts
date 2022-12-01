import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { tokenAuth } from "../../helpers/tokenAuth";
import { userModel } from "../../database/models/user";
import { studentResourcesModel } from "../../database/models/studentResources";

dotenv.config();

export const getTrainerRequest = async (userToken: string): Promise<any> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const { studentResourcesId } = await userModel.findById(decodedUser.id).select("student").exec(); //TODO sprawdzic

        const studentData = await studentResourcesModel.findById(studentResourcesId);

        // console.log("studentData.requestedTrainers", studentData.requestedTrainers);

        if (!studentData.requestedTrainers) {
            return { code: ResponseCode.success, success: true, requestedTrainers: {} };
        }

        // const test = await Promise.all(
        //     studentData.requestedTrainers.map(async (requestedTrainer) => {
        //         console.log("trainerId", requestedTrainer.id);

        //         const allRequestedTrainersData = await trainerResourcesModel.findById(requestedTrainer.id);

        //         return allRequestedTrainersData;
        //     })
        // );

        // console.log("test", test);

        return { code: ResponseCode.success, success: true, requestedTrainers: {} };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
