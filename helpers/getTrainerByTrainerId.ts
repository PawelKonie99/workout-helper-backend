import { trainerModel } from "../database/models/trainer";

export const getTrainerByTrainerId = async (id: string) => {
    const trainer = await trainerModel.findById(id);

    return trainer;
};
