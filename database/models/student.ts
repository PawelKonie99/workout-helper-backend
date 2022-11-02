import { model, Schema, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IStudentSchema extends Document {
    workoutPlan: string;
    studentName: string;
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
    workoutPlan: {
        type: String,
        minlength: 3,
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
