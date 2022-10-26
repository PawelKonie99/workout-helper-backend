import { IUserCredentials, ILoginResponse } from "../../types/IUser.types";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const loginUser = async (userCredentails: IUserCredentials): Promise<ILoginResponse> => {
    const { username, password } = userCredentails;

    try {
        const registeredUser = await userModel.findOne({ username });

        const correctPassword: boolean = registeredUser
            ? await bcrypt.compare(password, registeredUser?.passwordHash)
            : false;

        if (!registeredUser || !correctPassword) {
            return { code: ResponseCode.success, message: "Invalid username or password", loggedUser: {} };
        }

        const userForToken = {
            username,
            id: registeredUser._id,
        };

        const { JWT_TOKEN_SECRET } = process.env;
        const token = jwt.sign(userForToken, JWT_TOKEN_SECRET);

        //TODO think about better message
        return {
            code: ResponseCode.success,
            message: "User found in databse",
            loggedUser: { username, token, isTrainer: registeredUser.isTrainer },
        };
    } catch (error) {
        return { code: ResponseCode.badRequest, message: error, loggedUser: {} };
    }
};
