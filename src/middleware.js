import { NextResponse } from "next/server";
import { getResponseMessage } from "./helper/responseMessage";

export function middleware(request){
    const authToken = request.cookies.get("authToken")?.value;
 
    // Public api routes
    if(request.nextUrl.pathname === "/api/login" || 
       request.nextUrl.pathname === "/api/users"
    ){
        return;
    }
    
    const loggedInUserNotAccessPath = 
        request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/signup";
    
    if(loggedInUserNotAccessPath){
        // accessing not secure route
        if(authToken){
            return NextResponse.redirect(new URL('/profile/user',request.url));
        }
    } else {
        // accessing secure route
        if(!authToken){
            if(request.nextUrl.pathname.startsWith("/api")){
                return getResponseMessage("Access Denied !!",401,false);
            }
            return NextResponse.redirect(new URL('/login',request.url));
        } else {
            // Verify the jwt token
        }
    }
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/add-task",
        "/show-tasks",
        "/profile/:path*",
        "/api/:path*"
    ]   
}