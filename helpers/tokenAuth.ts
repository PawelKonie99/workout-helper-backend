import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { IDecodedUser } from "../types/IUser.types";
dotenv.config();

export const tokenAuth = (userToken: string): IDecodedUser => {
    const { JWT_TOKEN_SECRET } = process.env;

    const transformedToken = userToken.replace("Bearer ", "");

    const decodedUser = jwt.verify(transformedToken, JWT_TOKEN_SECRET) as IDecodedUser;

    return decodedUser;
};
