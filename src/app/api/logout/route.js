import { getResponseMessage } from "@/helper/responseMessage"

export const POST = () => {
    const response =  getResponseMessage("Logged Out !!",200,true);
    response.cookies.set("authToken","",{
        expiresIn: new Date(0)
    })
    return response;
}