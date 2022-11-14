import { model, Schema, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IDatabaseProduct } from "../../types/IFood.types";
import { IWorkoutFields } from "../../types/IWorkout.types";

export interface IStudentSchema extends Document {
    studentName: string;
    trainingPlan: IWorkoutFields[];
    diet: {
        breakfast: IDatabaseProduct[];
        brunch: IDatabaseProduct[];
        dinner: IDatabaseProduct[];
        dessert: IDatabaseProduct[];
        supper: IDatabaseProduct[];
    };
    user: {
        type: Types.ObjectId;
        ref: "User";
    };
    trainer: {
        type: Types.ObjectId;
        ref: "Trainer";
    };
}

const studentSchema = new Schema<IStudentSchema>({
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
    studentName: {
        type: String,
        minlength: 3,
        required: true,
    },
    user: {
        required: true,
        type: Types.ObjectId,
        ref: "User",
    },
    trainer: {
        type: Types.ObjectId,
        ref: "Trainer",
    },
});

studentSchema.plugin(uniqueValidator);
studentSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

export const studentModel = model<IStudentSchema>("Student", studentSchema);
