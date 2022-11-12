import uniqueValidator from "mongoose-unique-validator";
import { Schema, model, Document, Types } from "mongoose";
import { IWorkoutFields } from "../../types/IWorkout.types";

export interface IWorkoutSchema extends Document {
    workout: {
        date: Date;
        workoutData: IWorkoutFields[];
    };
    user: {
        type: Types.ObjectId;
        ref: "User";
    };
}

const workoutSchema = new Schema<IWorkoutSchema>({
    workout: {
        date: {
            type: Date,
            required: true,
        },
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
    },
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
