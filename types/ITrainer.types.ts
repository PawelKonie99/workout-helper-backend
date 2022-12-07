import { Types } from "mongoose";
import { MEAL_TYPES } from "../enums/meal";
import { ResponseCode } from "../enums/responseCode";
import { IMealMacros, IProductsSummary } from "./IFood.types";
import { IUserWorkoutDataFromDatabase, IWorkoutFields } from "./IWorkout.types";

export interface IStudentPayload {
    studentName: string;
}

export interface IGetAllStudentsResponse {
    code: ResponseCode;
    success: boolean;
    allStudents?:
        | {
              id: {
                  type: Types.ObjectId;
                  ref: "User";
              };
              studentName: string;
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

export interface IGetSingleStudentDataResponse {
    code: ResponseCode;
    success: boolean;
    allUserWorkouts?: IUserWorkoutDataFromDatabase[] | [];
    mealHistory?:
        | {
              dailySummary: IProductsSummary;
              mealDate: string;
              breakfast: IMealMacros;
              brunch: IMealMacros;
              dinner: IMealMacros;
              dessert: IMealMacros;
              supper: IMealMacros;
          }[]
        | [];
}
