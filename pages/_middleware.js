import {getToken} from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req){
      // Token will be there if user is logged in
     const token = await getToken({req,secret:process.env.JWT_SECRET})
   const {pathname} = req.nextUrl
     //allow if it is valid
    if(pathname.includes('/api/auth')|| token){
        return NextResponse.next()
    }

    //Redirect user to login page if they dont have token
    
    if(!token && pathname !== "/login"){
        return NextResponse.redirect('/login') 
    }
}