import { model, Schema, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface ITrainerSchema extends Document {
    user: {
        type: Types.ObjectId;
        ref: "User";
    };
    students: {
        type?: Types.ObjectId;
        ref?: "Student";
    }[];
}

const trainerSchema = new Schema<ITrainerSchema>({
    user: {
        required: true,
        type: Types.ObjectId,
        ref: "User",
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
});

trainerSchema.plugin(uniqueValidator);
trainerSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

export const trainerModel = model<ITrainerSchema>("Trainer", trainerSchema);
