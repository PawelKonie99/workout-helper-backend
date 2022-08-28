import { IUserCredentials, IRegisterResponse, ILoginResponse } from "../interfaces/userValidationInterfaces";
import { userModel } from "../database/models/user";
import { ResponseCode } from "../enums/responseCode";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { checkPasswordLenght } from "./helpers/userValiation";
dotenv.config();

export const registerUser = async (userCredentails: IUserCredentials): Promise<IRegisterResponse> => {
    try {
        const { username, password } = userCredentails;

        if (!checkPasswordLenght(password)) {
            return { code: ResponseCode.success, message: "Password is to short", success: false };
        }

        const isUserExist = await userModel.findOne({ username });

        if (isUserExist) {
            return { code: ResponseCode.success, message: "User already exists", success: false };
        }

        const { SALT_ROUNDS } = process.env;
        const passwordHash = await bcrypt.hash(password, parseInt(SALT_ROUNDS));

        const newUser = new userModel({
            username,
            passwordHash: passwordHash,
        });

        await newUser.save();

        return { code: ResponseCode.success, message: "User successfully created", success: true };
    } catch (error) {
        console.log(error);
        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};

export const loginUser = async (userCredentails: IUserCredentials): Promise<ILoginResponse> => {
    const { username, password } = userCredentails;

    try {
        const registeredUser = await userModel.findOne({ username });

        const correctPassword: boolean = registeredUser
            ? await bcrypt.compare(password, registeredUser?.passwordHash)
            : false;

        if (!registerUser || !correctPassword) {
            return { code: ResponseCode.success, message: "Invalid username or password" };
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
            loggedUser: { username, token },
        };
    } catch (error) {
        return { code: ResponseCode.badRequest, message: error };
    }
};
