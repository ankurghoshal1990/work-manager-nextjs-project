// /api/works

import { getResponseMessage } from "@/helper/responseMessage";
import { Work } from "@/models/work";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";

// Get all the works
export const GET = async () => {
    try {
        await connectDb();
        const work = await Work.find();
        return NextResponse.json(work);
    } catch (error) {
        console.log(error);
        return getResponseMessage('Failed to get work details !!',404,false);
    }

}

// Create new works
export const POST = async (request) => {
    const {title,content,status} = await request.json();
    try {
        const authToken = request.cookies.get("authToken")?.value;
        const data = jwt.verify(authToken,process.env.JWT_KEY);
        await connectDb();
        const work = new Work({
            title,
            content,
            userId:data._id,
            status,
        })
        const createdWork = await work.save();
        return NextResponse.json(createdWork,{
            status: 201
        });
    } catch (error) {
        console.log('Error in creating work');
        return getResponseMessage('Failed to create work !!',500,false);    
    }
}