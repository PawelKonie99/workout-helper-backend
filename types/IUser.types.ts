import { ResponseCode } from "../enums/responseCode";

export interface IUserCredentials {
    username: string;
    password: string;
    isTrainer: boolean;
}

export interface IRegisterResponse {
    code: ResponseCode;
    message: string;
    success: boolean;
}

export interface ILoginResponse {
    code: ResponseCode;
    message: string;
    loggedUser:
        | {
              username: string;
              token: string;
              isTrainer: boolean;
          }
        | Record<string, never>;
}

export interface IDecodedUser {
    id: string;
    username: string;
}
