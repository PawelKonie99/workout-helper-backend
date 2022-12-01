import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { trainerResourcesModel } from "../../database/models/trainerResources";
import { tokenAuth } from "../../helpers/tokenAuth";
import { mapAllStudents } from "./helpers/mapAllStudents";
import { IGetAllStudentsResponse } from "../../types/ITrainer.types";
import { userModel } from "../../database/models/user";

dotenv.config();

export const getAllStudents = async (userToken: string): Promise<IGetAllStudentsResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);
        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const { trainerResourcesId } = await userModel.findById(decodedUser.id);

        const trainerStudentsId = await trainerResourcesModel
            .findById(trainerResourcesId)
            .select("students")
            .exec();

        if (!trainerStudentsId.students.length) {
            return {
                code: ResponseCode.success,
                success: true,
                allStudents: [],
            };
        }

        const allTrainerStudents = await Promise.all(
            trainerStudentsId.students.map(async (studentId) => {
                const student = await userModel.findById(studentId);

                return student;
            })
        );

        const mappedStudents = mapAllStudents(allTrainerStudents);

        return {
            code: ResponseCode.success,
            success: true,
            allStudents: mappedStudents,
        };
    } catch (error) {
        console.log("error", error);

        return { code: ResponseCode.badRequest, success: false };
    }
};
