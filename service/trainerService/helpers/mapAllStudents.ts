import { Types, Document } from "mongoose";
import { IStudentSchema } from "../../../database/models/student";

export const mapAllStudents = (
    allTrainerStudents: (Document<unknown, IStudentSchema> &
        IStudentSchema & {
            _id: Types.ObjectId;
        })[]
) => {
    return allTrainerStudents.map(({ user, studentName, id }) => ({ user, studentName, id }));
};
