import { mealModel } from "../../database/models/meal";
import { userModel } from "../../database/models/user";
import { ResponseCode } from "../../enums/responseCode";
import { tokenAuth } from "../../helpers/tokenAuth";
import { IAllProductsResponse } from "../../types/IFood.types";
import { allUserProducts } from "./helpers/allUserProducts";

export const deleteProductFromDb = async (
    userToken: string,
    productId: string
): Promise<IAllProductsResponse> => {
    try {
        const decodedUser = tokenAuth(userToken);

        if (!decodedUser) {
            return { code: ResponseCode.badRequest, success: false };
        }

        ///

        const test2 = await mealModel.find({ "allDayMeals.breakfast._id": productId });

        // const res = await mealModel.findByIdAndUpdate(
        //     productId,
        //     { $pull: { "allDayMeals.breakfast": { _id: productId } } },
        //     { safe: true, upsert: true }
        // );

        const res = mealModel.findByIdAndUpdate(
            { _id: "633b1aef0b3c0dc28c15015f" },
            { $pull: { "allDayMeals.breakfast": { _id: "633b1aef0b3c0dc28c150160" } } }
        );

        // const test2 = mealModel.aggregate([
        //     {
        //         $unwind: "$allDayMeals",
        //     },
        //     {
        //         $match: {
        //             "breakfast._id": productId,
        //         },
        //     },
        // ]);
        ////
        console.log("res", res);
        // console.log("test2", test2);

        return { code: ResponseCode.success, success: true, allUserProducts: undefined };
    } catch (error) {
        return { code: ResponseCode.badRequest, success: false };
    }
};
