import { connectDb } from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { Work } from "@/models/work";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
    const {userId} = params;
    try {
        await connectDb();
        const works = await Work.find({
            userId: userId
        })
        return NextResponse.json(works);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Failed to get works",404,false);
    }
}