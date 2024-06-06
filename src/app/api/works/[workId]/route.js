// /api/works/{workId}

import { connectDb } from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { Work } from "@/models/work";
import { NextResponse } from "next/server";

// Get specific work
export const GET = async (request,{params}) => {
    const {workId} = params;
    try {
        await connectDb();
        const work = await Work.findById(workId);
        return NextResponse.json(work); 
    } catch (error) {
        return getResponseMessage("Failed to get work",404,false);
    }
}

// Update a specific work
export const PUT = async (request,{params}) => {
    try {
        const {workId} = params;
        const {title,content,status} = await request.json();
        await connectDb();
        let work = await Work.findById(workId);
        (work.title = title), (work.content = content), (work.status = status);
        const updatedWork = await work.save();
        return NextResponse.json(updatedWork);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Failed to update work !!",500,false);
    }
}

// Delete a specific work
export const DELETE = async (request,{params}) => {
    try {
        const {workId} = params;
        await connectDb();
        await Work.deleteOne({
            _id: workId
        })
        return getResponseMessage("Work deleted !!",200,true);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Failed to delete work",500,false);
    }
}