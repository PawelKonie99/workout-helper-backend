import { model, Schema, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IWorkoutFields } from "../../types/IWorkout.types";

export interface IStudentSchema extends Document {
    studentName: string;
    workoutPlan: IWorkoutFields[];
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
    workoutPlan: [
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
