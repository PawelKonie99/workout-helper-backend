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

export interface IAllWorkoutOptionsResponse {
    code: ResponseCode;
    success: boolean;
    exercise?: IWorkoutOption[];
    weight?: IWorkoutOption[];
    reps?: IWorkoutOption[];
    series?: IWorkoutOption[];
}

interface IWorkoutOption {
    value: string;
    label: string;
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
