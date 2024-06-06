import { NextResponse } from "next/server"

export const getResponseMessage = (message,statusCode,successMessage) => {
    return NextResponse.json({
        message:message,
        success:successMessage
    },{
        status: statusCode
    })
}