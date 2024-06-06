import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import bcrypt from "bcryptjs/dist/bcrypt";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    let users = [];
    try {
        await connectDb();
        users = await User.find().select("-password");
    } catch (error) {
        console.log('Error is users retrieval')
        return NextResponse.json({
            message: "Failed to get users",
            success: false
        })
    }
    return NextResponse.json(users)
}

// Create user
export const POST = async (request) => {
    try {
        // fetch user details from request object
        const {name,email,password,about,profileURL} = await request.json();
        await connectDb();
        const user = new User({
            name,
            email,
            password,
            about,
            profileURL
        });
        user.password = bcrypt.hashSync(
            user.password,
            parseInt(process.env.BCRYPT_SALT)
        );
        const createdUser = await user.save();
        const response = NextResponse.json(user,{
            status: 201
        });
        return response   
    } catch (error) {
        console.log(error);
        return getResponseMessage("Failed to create user",500,false);
    }
}