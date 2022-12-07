import { IUserCredentials } from "../../types/IUser.types";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { checkPasswordLenght } from "./helpers/userValiation";
import { IStandardResponse } from "../../types/common.types";
import { trainerResourcesModel } from "../../database/models/trainerResources";
import { studentResourcesModel } from "../../database/models/studentResources";
dotenv.config();

export const registerUser = async (userCredentails: IUserCredentials): Promise<IStandardResponse> => {
    try {
        const { username, password, isTrainer } = userCredentails;

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
            roles: {
                adminRole: false,
                trainerRole: isTrainer,
                userRole: true,
            },
        });

        const savedUser = await newUser.save();

        if (isTrainer) {
            const newTrainer = new trainerResourcesModel({
                userId: savedUser.id,
            });

            await newTrainer.save();

            await userModel.findByIdAndUpdate(savedUser.id, {
                trainerResourcesId: newTrainer.id,
            });
        } else {
            const newStudent = new studentResourcesModel({
                userId: savedUser.id,
            });

            await newStudent.save();

            await userModel.findByIdAndUpdate(savedUser.id, {
                studentResourcesId: newStudent.id,
            });
        }

        return { code: ResponseCode.success, message: "User successfully created", success: true };
    } catch (error) {
        return { code: ResponseCode.badRequest, message: error, success: false };
    }
};
