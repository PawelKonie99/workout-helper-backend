import { ResponseCode } from "../enums/responseCode";
import { IDatabaseProduct, IProductsSummary } from "./IFood.types";
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
              dailySummary?: IProductsSummary | Record<string, never>;
              breakfast: IDatabaseProduct[];
              brunch: IDatabaseProduct[];
              dinner: IDatabaseProduct[];
              dessert: IDatabaseProduct[];
              supper: IDatabaseProduct[];
          }
        | Record<string, never>;
}
