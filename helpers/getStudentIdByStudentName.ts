import { userModel } from "../database/models/user";

export const getStudentIdByStudentName = async (studentName: string) => {
    const { id } = (await userModel.findOne({ username: studentName })) || {};

    return id;
};
