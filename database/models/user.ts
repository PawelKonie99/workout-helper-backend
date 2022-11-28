import { model, Schema, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUserSchema extends Document {
    username: string;
    passwordHash: string;
    roles: {
        adminRole: boolean;
        userRole: boolean;
        trainerRole: boolean;
    };
    workouts: {
        type?: Types.ObjectId;
        ref?: "Workout";
    }[];
    meals: {
        type: Types.ObjectId;
        ref: "Meal";
    }[];
    student: {
        type?: Types.ObjectId;
        ref?: "Student";
    };
    trainer: {
        type?: Types.ObjectId;
        ref?: "Trainer";
    };
}

const userSchema = new Schema<IUserSchema>({
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
    roles: {
        adminRole: {
            type: Boolean,
            required: true,
        },
        userRole: {
            type: Boolean,
            required: true,
        },
        trainerRole: {
            type: Boolean,
            required: true,
        },
    },
    workouts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Workout",
        },
    ],
    meals: [
        {
            type: Schema.Types.ObjectId,
            ref: "Meal",
        },
    ],
    student: {
        type: Types.ObjectId,
        ref: "Student",
    },
    trainer: {
        type: Types.ObjectId,
        ref: "Trainer",
    },
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

export const userModel = model<IUserSchema>("User", userSchema);
