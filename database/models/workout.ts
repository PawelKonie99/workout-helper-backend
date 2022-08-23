import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { ISet } from "../../interfaces/workoutInterface";

export interface IWorkoutSchema extends mongoose.Document {
  id: string;
  setInfo: ISet[];
}

const workoutSchema = new mongoose.Schema({
  workout: [
    {
      id: {
        type: String,
        required: true,
      },
      setInfo: [
        {
          id: {
            type: String,
            required: true,
          },
          numberOfReps: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
});

workoutSchema.plugin(uniqueValidator);
workoutSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const workoutModel = mongoose.model<IWorkoutSchema>("Workout", workoutSchema);
