import { connectDb } from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { User } from "@/models/user";
import bcrypt from "bcryptjs/dist/bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const {email,password} = await request.json();
    try {
        await connectDb();
        const user = await User.findOne({
            email: email,
        });
        
        if(user == null){
            throw new Error("user not found !!");
        }
        const matched = bcrypt.compareSync(password,user.password);
        if(!matched){
            throw new Error("Passowrd not matched !!");
        }
        // Creation of jwt token
        const token = jwt.sign({
            _id:user._id,
            name: user.name
        },process.env.JWT_KEY);
        console.log(token);
        // send token in cookies
        const response = NextResponse.json({
            message: "Login Success",
            success: true,
            user: user
        },{
            status: 200
        })
        response.cookies.set("authToken",token,{
            expiresIn: "1d",
            httpOnly: true,
        });
        return response;
    } catch (error) {
        console.log(error);
        return getResponseMessage(error.message,500,false);
    }
}