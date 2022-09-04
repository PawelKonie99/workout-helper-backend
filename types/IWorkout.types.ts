import { ResponseCode } from "../enums/responseCode";

export interface IWorkout {
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

export interface IAllWorkoutsResponse {
    code: ResponseCode;
    success: boolean;
    allUserWorkouts?: {
        workout: {
            date: Date;
            workoutData: IWorkout;
        };
    }[];
}
