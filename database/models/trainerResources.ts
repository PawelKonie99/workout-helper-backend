import { model, Schema, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface ITrainerResourcesSchema extends Document {
    userId: {
        type: Types.ObjectId;
        ref: "User";
    };
    requestedStudents: {
        type?: Types.ObjectId;
        ref?: "User";
    }[];
    students: {
        type?: Types.ObjectId;
        ref?: "User";
    }[];
}

const trainerResourcesSchema = new Schema<ITrainerResourcesSchema>({
    userId: {
        required: true,
        type: Types.ObjectId,
        ref: "User",
    },
    requestedStudents: [
        {
            type: Schema.Types.ObjectId,
            ref: "StudentResources",
        },
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "StudentResources",
        },
    ],
});

trainerResourcesSchema.plugin(uniqueValidator);
trainerResourcesSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

export const trainerResourcesModel = model<ITrainerResourcesSchema>(
    "TrainerResources",
    trainerResourcesSchema
);
