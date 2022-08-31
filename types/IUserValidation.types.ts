import { ResponseCode } from "../enums/responseCode";

export interface IUserCredentials {
  username: string;
  password: string;
}

export interface IRegisterResponse {
  code: ResponseCode;
  message: string;
  success: boolean;
}

export interface ILoginResponse {
  code: ResponseCode;
  message: string;
  loggedUser?: {
    username: string;
    token: string;
  };
}
