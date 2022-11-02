import { ResponseCode } from "../../enums/responseCode";
import dotenv from "dotenv";
import { trainerModel } from "../../database/models/trainer";
import { tokenAuth } from "../../helpers/tokenAuth";
import { getTrainerIdByUserId } from "./helpers/getTrainerIdByUserId";
import { studentModel } from "../../database/models/student";
import { mapAllStudents } from "./helpers/mapAllStudents";
import { IGetAllStudentsResponse } from "../../types/ITrainer.types";

dotenv.config();

export const getAllStudents = async (userToken: string): Promise<IGetAllStudentsResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);
        if (!decodedUser) {
            return { code: ResponseCode.badRequest, success: false, allStudents: [] };
        }

        const trainerId = await getTrainerIdByUserId(decodedUser.id);

        console.log("trainerId", trainerId);

        const trainerStudentsId = await trainerModel.findById(trainerId).select("students").exec();
        console.log("trainerStudentsId", trainerStudentsId);

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
        return { code: ResponseCode.badRequest, success: false, allStudents: [] };
    }
};
