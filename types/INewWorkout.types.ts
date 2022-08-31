import { ResponseCode } from "../enums/responseCode";

export interface INewWorkout {
    workoutData: {
        exerciseName: string;
        repsQuantity: number;
        seriesQuantity: number;
        weightQuantity: number;
    }[];
}

export interface ISaveWorkoutResponse {
    code: ResponseCode;
    message: string;
    success: boolean;
}
