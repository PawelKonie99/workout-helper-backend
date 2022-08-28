import uniqueValidator from "mongoose-unique-validator";
import { Schema, model, Document } from "mongoose";

export interface IWorkoutSeriesSchema {
    workoutData: {
        exerciseName: string;
        repsQuantity: number;
        seriesQuantity: number;
        weightQuantity: number;
    }[];
}

export interface IWorkoutSchema extends Document {
    id: string;
    workoutData: IWorkoutSeriesSchema;
}

const workoutSchema = new Schema<IWorkoutSchema>({
    workoutData: [
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
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

workoutSchema.plugin(uniqueValidator);
workoutSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export const workoutModel = model<IWorkoutSchema>("Workout", workoutSchema);
