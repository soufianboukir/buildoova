import { auth } from "@/auth";
import { dbConnection } from "@/config/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest): Promise<NextResponse> =>{
    try{
        const session = await auth()
        if(!session){
            return NextResponse.json({
                message: 'Unauthorized'
            },{
                status: 401
            })
        }

        await dbConnection();
        const {username,name} = await request.json();

        const usernameExists = await User.findOne({$and:[{_id:{$ne:session.user.id}},{username}]})
        if(usernameExists){
            return NextResponse.json({
                message: 'Username already exists'
            },{
                status: 404
            })
        }

        const user = await User.findById(session.user.id)

        if(!user){
            return NextResponse.json({
                message: 'User not found'
            },{
                status: 404
            })
        }

        user.name = name;
        user.username = username;
        await user.save();

        return NextResponse.json({
            message: 'Your profile updated successfully'
        })
    }catch(error){
        console.log(error);
        
        return NextResponse.json({
            message: 'An error occured from server'
        },{
            status: 500
        })
    }
}