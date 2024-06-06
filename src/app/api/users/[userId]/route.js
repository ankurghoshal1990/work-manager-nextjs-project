import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server"

// Get Single user
export const GET = async (request,{params}) => {
    const {userId} = params;
    try {
        await connectDb();
        const user = await User.findById({
            _id:userId
        }).select("-password");
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({
            message: "Error getting user details !!",
            success: false
        })   
    }
}

// User Deletion
export const DELETE = async (request,{params}) => {
    const {userId} = params;
    try {
        await connectDb();
        await User.deleteOne({
            _id:userId
        })
        return NextResponse.json({
            message: "User Deleted",
            success: true
        })
    } catch (error) {
        console.log(error);
        return getResponseMessage("Failed to delete user",500,false);   
    }
}

// Update user
export const PUT = async (request,{params}) => {
    const {userId} = params;
    const {name,password,about,profileURL} = await request.json();
    try {
        await connectDb();
        const user = await User.findById(userId);
        user.name = name;
        user.password = password;
        user.about = about;
        user.profileURL = profileURL;
        const updatedUser = await user.save();
        return NextResponse.json(updatedUser);

    } catch (error) {
        console.log(error);
        return getResponseMessage("Failed to update user",500,false);
    }
}