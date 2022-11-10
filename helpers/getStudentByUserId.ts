import { ObjectId } from "mongoose";
import { studentModel } from "../database/models/student";

export const getStudentByUserId = async (id: string) => {
    const student = await studentModel.findById(id);

    return student;
};
