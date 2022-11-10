import { userModel } from "../database/models/user";

export const getStudentIdByStudentName = async (studentName: string) => {
    const { student } = (await userModel.findOne({ username: studentName })) || {};

    return student;
};
