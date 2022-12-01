import { Types, Document } from "mongoose";
import { IUserSchema } from "../../../database/models/user";

export const mapAllStudents = (
    allTrainerStudents: (Document<unknown, IUserSchema> &
        IUserSchema & {
            _id: Types.ObjectId;
        })[]
) => {
    return allTrainerStudents.map(({ username, id }) => ({ studentName: username, id }));
};
