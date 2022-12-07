import { model, Schema, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IDatabaseProduct } from "../../types/IFood.types";
import { IWorkoutFields } from "../../types/IWorkout.types";

export interface IStudentResourcesSchema extends Document {
    trainingPlan: IWorkoutFields[];
    diet: {
        breakfast: IDatabaseProduct[];
        brunch: IDatabaseProduct[];
        dinner: IDatabaseProduct[];
        dessert: IDatabaseProduct[];
        supper: IDatabaseProduct[];
    };
    requestedTrainers: {
        type: Types.ObjectId;
        ref: "User";
    }[];
    userId: {
        type: Types.ObjectId;
        ref: "User";
    };
    trainerId: {
        type: Types.ObjectId;
        ref: "User";
    };
}

const studentResourcesSchema = new Schema<IStudentResourcesSchema>({
    trainingPlan: [
        {
            exerciseName: {
                type: String,
                required: true,
            },
            repsQuantity: {
                type: String,
                required: true,
            },
            seriesQuantity: {
                type: String,
                required: true,
            },
            weightQuantity: {
                type: String,
                required: true,
            },
        },
    ],
    requestedTrainers: [
        {
            type: Types.ObjectId,
            ref: "User",
        },
    ],
    diet: {
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
    },
    userId: {
        required: true,
        type: Types.ObjectId,
        ref: "User",
    },
    trainerId: {
        type: Types.ObjectId,
        ref: "User",
    },
});

studentResourcesSchema.plugin(uniqueValidator);
studentResourcesSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

export const studentResourcesModel = model<IStudentResourcesSchema>(
    "StudentResources",
    studentResourcesSchema
);
