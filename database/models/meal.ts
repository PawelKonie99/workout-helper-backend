import { Schema, model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IMealSchema extends Document {
    mealDate: string;
    breakfast: [{ productName: string; kcal: string; proteins: string; carbons: string; fat: string }];
    brunch: [{ productName: string; kcal: string; proteins: string; carbons: string; fat: string }];
    dinner: [{ productName: string; kcal: string; proteins: string; carbons: string; fat: string }];
    dessert: [{ productName: string; kcal: string; proteins: string; carbons: string; fat: string }];
    supper: [{ productName: string; kcal: string; proteins: string; carbons: string; fat: string }];
    user: {
        type: typeof Schema.Types.ObjectId;
        ref: "User";
    };
}

const mealSchema = new Schema<IMealSchema>({
    mealDate: {
        type: String,
        required: true,
    },
    breakfast: [
        {
            productName: { type: String },
            kcal: { type: String },
            proteins: { type: String },
            carbons: { type: String },
            fat: { type: String },
        },
    ],
    brunch: [
        {
            productName: { type: String },
            kcal: { type: String },
            proteins: { type: String },
            carbons: { type: String },
            fat: { type: String },
        },
    ],
    dinner: [
        {
            productName: { type: String },
            kcal: { type: String },
            proteins: { type: String },
            carbons: { type: String },
            fat: { type: String },
        },
    ],
    dessert: [
        {
            productName: { type: String },
            kcal: { type: String },
            proteins: { type: String },
            carbons: { type: String },
            fat: { type: String },
        },
    ],
    supper: [
        {
            productName: { type: String },
            kcal: { type: String },
            proteins: { type: String },
            carbons: { type: String },
            fat: { type: String },
        },
    ],

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

mealSchema.plugin(uniqueValidator);
mealSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export const mealModel = model<IMealSchema>("Meal", mealSchema);
