import { ResponseCode } from "../enums/responseCode";

export interface IWorkoutSubmit {
  jwtToken: string;
  workout: IWorkout[];
}

export interface IWorkout {
  id: string;
  setInfo: ISet[];
}

export interface ISet {
  id: string;
  numberOfReps: number;
}

export interface ISaveWorkoutResponse {
  code: ResponseCode;
  message: string;
  success: boolean;
}
