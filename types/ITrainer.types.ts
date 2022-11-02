import { Types } from "mongoose";
import { ResponseCode } from "../enums/responseCode";

export interface IStudentPayload {
    studentName: string;
}

export interface IAddStudentResponse {
    code: ResponseCode;
    message: string;
    success: boolean;
}

export interface IGetAllStudentsResponse {
    code: ResponseCode;
    success: boolean;
    allStudents:
        | {
              user: {
                  type: Types.ObjectId;
                  ref: "User";
              };
              studentName: string;
              id: string;
          }[]
        | [];
}
