import { ResponseCode } from "../enums/responseCode";
import { IDatabaseProduct } from "./IFood.types";
import { IWorkoutFields } from "./IWorkout.types";

export interface ITrainingPlanResponse {
    code: ResponseCode;
    success: boolean;
    trainingPlan?: IWorkoutFields[] | [];
}

export interface IGetStudenDietResponse {
    code: ResponseCode;
    success: boolean;
    diet?:
        | {
              breakfast: IDatabaseProduct[];
              brunch: IDatabaseProduct[];
              dinner: IDatabaseProduct[];
              dessert: IDatabaseProduct[];
              supper: IDatabaseProduct[];
          }
        | Record<string, never>;
}
