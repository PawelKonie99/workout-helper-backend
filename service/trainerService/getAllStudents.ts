import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { trainerModel } from "../../database/models/trainer";
import { tokenAuth } from "../../helpers/tokenAuth";

import { studentModel } from "../../database/models/student";
import { mapAllStudents } from "./helpers/mapAllStudents";
import { IGetAllStudentsResponse } from "../../types/ITrainer.types";
import { getTrainerIdByUserId } from "../../helpers/getTrainerIdByUserId";

dotenv.config();

export const getAllStudents = async (userToken: string): Promise<IGetAllStudentsResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);
        if (!decodedUser) {
            return { code: ResponseCode.unauthorized, success: false };
        }

        const trainerId = await getTrainerIdByUserId(decodedUser.id);

        const trainerStudentsId = await trainerModel.findById(trainerId).select("students").exec();

        const allTrainerStudents = await Promise.all(
            trainerStudentsId.students.map(async (studentId) => {
                const student = await studentModel.findById(studentId);

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
        return { code: ResponseCode.badRequest, success: false };
    }
};
