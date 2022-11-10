import { userModel } from "../database/models/user";

export const getTrainerIdByUserId = async (id: string) => {
    const { trainer } = await userModel.findById(id);

    return trainer;
};
