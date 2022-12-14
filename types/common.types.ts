import { ResponseCode } from "../enums/responseCode";

export interface IStandardResponse {
    code: ResponseCode;
    message?: string;
    success: boolean;
}

export interface IRoles {
    adminRole: boolean;
    userRole: boolean;
    trainerRole: boolean;
}
