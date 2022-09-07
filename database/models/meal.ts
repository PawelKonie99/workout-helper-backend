import { Schema, model, Document, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IMealSchema extends Document {
    allDayMeals: {
        date: Date;
        breakfast: [{ kcal: string; proteins: string; carbons: string; fat: string }];
        brunch: [{ kcal: string; proteins: string; carbons: string; fat: string }];
        dinner: [{ kcal: string; proteins: string; carbons: string; fat: string }];
        dessert: [{ kcal: string; proteins: string; carbons: string; fat: string }];
        supper: [{ kcal: string; proteins: string; carbons: string; fat: string }];
    };
    user: {
        type: typeof Schema.Types.ObjectId;
        ref: "User";
    };
}

const mealSchema = new Schema<IMealSchema>({
    allDayMeals: {
        date: {
            type: Date,
            required: true,
        },
        breakfast: [
            {
                kcal: { type: String },
                proteins: { type: String },
                carbons: { type: String },
                fat: { type: String },
            },
        ],
        brunch: [
            {
                kcal: { type: String },
                proteins: { type: String },
                carbons: { type: String },
                fat: { type: String },
            },
        ],
        dinner: [
            {
                kcal: { type: String },
                proteins: { type: String },
                carbons: { type: String },
                fat: { type: String },
            },
        ],
        dessert: [
            {
                kcal: { type: String },
                proteins: { type: String },
                carbons: { type: String },
                fat: { type: String },
            },
        ],
        supper: [
            {
                kcal: { type: String },
                proteins: { type: String },
                carbons: { type: String },
                fat: { type: String },
            },
        ],
    },
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
