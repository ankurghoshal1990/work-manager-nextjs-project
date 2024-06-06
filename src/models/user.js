import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true,"Email is Required!!"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"Password is Required!!"],
    },
    about: String,
    profileURL: String,
    // address: {
    //     street: String,
    //     city: String,
    //     country: String,
    //     pinCode: Number
    // }
})

export const User = mongoose.models.users || mongoose.model("users",UserSchema);