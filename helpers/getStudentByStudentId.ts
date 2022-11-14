import { studentModel } from "../database/models/student";

export const getStudentByStudentId = async (id: string) => {
    const student = await studentModel.findById(id);

    return student;
};
