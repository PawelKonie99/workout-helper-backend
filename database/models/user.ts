import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUserSchema extends mongoose.Document {
    username: string;
    passwordHash: string;
    isTrainer: boolean;
    workouts: {
        type?: mongoose.Types.ObjectId;
        ref?: "Workout";
    }[];
    meals: {
        type: typeof Schema.Types.ObjectId;
        ref: "Meal";
    }[];
    students: {
        type: typeof Schema.Types.ObjectId;
        ref: "User";
    }[];
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
    isTrainer: {
        type: Boolean,
        required: true,
    },
    workouts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workout",
        },
    ],
    meals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meal",
        },
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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
