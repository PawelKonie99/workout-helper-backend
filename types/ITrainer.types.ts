import { Types } from "mongoose";
import { MEAL_TYPES } from "../enums/meal";
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

export interface IRemoveDietProductPayload {
    productId: string;
    typeOfMeal: MEAL_TYPES;
}
