import { ResponseCode } from "../enums/responseCode";
import { IRoles } from "./common.types";

export interface IGetAllUsersResponse {
    code: ResponseCode;
    success: boolean;
    usersData?:
        | {
              roles: IRoles;
              username: string;
              id: string;
          }[]
        | [];
}

export interface IGetSingleUserResponse {
    code: ResponseCode;
    success: boolean;
    parsedUserData?:
        | {
              roles: IRoles;
              username: string;
              id: string;
          }
        | Record<string, never>;
}
