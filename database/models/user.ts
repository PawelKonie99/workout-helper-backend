import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUserSchema extends mongoose.Document {
    username: string;
    passwordHash: string;
    workouts: {
        type?: mongoose.Types.ObjectId;
        ref?: unknown;
    }[];
    meal: {
        type: typeof Schema.Types.ObjectId;
        ref: "Meal";
    };
}

const userSchema = new mongoose.Schema<IUserSchema>({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 3,
    },
    workouts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workout",
        },
    ],
    meal: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meal",
        },
    ],
});

userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

export const userModel = mongoose.model<IUserSchema>("User", userSchema);
