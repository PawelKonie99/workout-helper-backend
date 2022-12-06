import { ResponseCode } from "../enums/responseCode";
import { MANAGE_REQUESTED_TRAINERS } from "../enums/userDecision";
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

export interface IGetTrainerRequestResponse {
    code: ResponseCode;
    success: boolean;
    requestedTrainers?: IRequestedTrainerData[] | [];
}

export interface IRequestedTrainerData {
    username: string;
    id: string;
}

export interface IUserDecisionPayload {
    userDecision: MANAGE_REQUESTED_TRAINERS;
    trainerId: string;
}

export interface IUserDecisionResponse {
    code: ResponseCode;
    message: string;
    success: boolean;
    trainerName: string;
}
