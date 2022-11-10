import { Types } from "mongoose";
import { ResponseCode } from "../enums/responseCode";
import { IWorkoutFields } from "./IWorkout.types";

export interface IStudentPayload {
    studentName: string;
}

export interface IGetAllStudentsResponse {
    code: ResponseCode;
    success: boolean;
    allStudents?:
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

export interface IAddNewTrainingPlanPayload {
    workoutData: IWorkoutFields[];
    userData: {
        id: string;
        userName: string;
    };
}
