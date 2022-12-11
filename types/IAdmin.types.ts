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
