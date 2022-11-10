import { ResponseCode } from "../enums/responseCode";
import { IWorkoutFields } from "./IWorkout.types";

export interface ITrainingPlanResponse {
    code: ResponseCode;
    success: boolean;
    trainingPlan?: IWorkoutFields[] | [];
}
