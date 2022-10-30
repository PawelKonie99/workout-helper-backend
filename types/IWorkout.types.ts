import { ResponseCode } from "../enums/responseCode";

export interface IWorkout {
    workoutData: IWorkoutFields[];
}

export interface IUserWorkoutDataFromDatabase {
    workout: {
        date: Date;
        workoutData: IWorkoutFields[];
    };
}

export interface IAllWorkoutsResponse {
    code: ResponseCode;
    success: boolean;
    allUserWorkouts?: IUserWorkoutDataFromDatabase[];
}

export interface IWorkoutFields {
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
    exercise: IWorkoutOption[] | [];
    weight: IWorkoutOption[] | [];
    reps: IWorkoutOption[] | [];
    series: IWorkoutOption[] | [];
}

interface IWorkoutOption {
    value: string;
    label: string;
}

export interface IExerciseByName {
    workoutData: IWorkoutFields;
}

export interface IBestExerciseResponse {
    code: ResponseCode;
    success: boolean;
    exerciseWithRecord:
        | {
              workoutData: {
                  exerciseName: string;
                  repsQuantity: number;
                  seriesQuantity: number;
                  weightQuantity: number;
              };
          }
        | Record<string, never>;
}
