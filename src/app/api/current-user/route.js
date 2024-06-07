import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { connectDb } from "@/helper/db";

export const GET = async (request) => {
    const authToken = request.cookies.get("authToken")?.value;
    if(!authToken){
        return NextResponse.json({
            message:"User not logged in !!"
        })
    }
    const data = jwt.verify(authToken,process.env.JWT_KEY);
    await connectDb();
    const user = await User.findById(data._id).select("-password");
    return NextResponse.json(user);
}