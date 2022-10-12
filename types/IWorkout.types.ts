import { ResponseCode } from "../enums/responseCode";

export interface IWorkout {
    workoutData: IWorkoutData[];
}

interface IWorkoutData {
    exerciseName: string;
    repsQuantity: string;
    seriesQuantity: string;
    weightQuantity: string;
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

export interface IExerciseByName {
    workoutData: IWorkoutData;
}

export interface IBestExerciseResponse {
    code: ResponseCode;
    success: boolean;
    exerciseWithRecord?: {
        workoutData: {
            exerciseName: string;
            repsQuantity: number;
            seriesQuantity: number;
            weightQuantity: number;
        };
    };
}
