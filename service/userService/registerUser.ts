import { IUserCredentials, IRegisterResponse } from "../../types/IUser.types";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
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
