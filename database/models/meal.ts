import { Schema, model, Document, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IDatabaseProduct } from "../../types/IFood.types";

export interface IMealSchema extends Document {
    mealDate: string;
    breakfast: IDatabaseProduct[];
    brunch: IDatabaseProduct[];
    dinner: IDatabaseProduct[];
    dessert: IDatabaseProduct[];
    supper: IDatabaseProduct[];
    user: {
        type: Types.ObjectId;
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
