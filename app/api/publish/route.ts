import { auth } from "@/auth";
import { dbConnection } from "@/config/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest): Promise<NextResponse> =>{
    try{
        const session = await auth()
        if(!session){
            return NextResponse.json({
                message: 'Unauthorized'
            },{
                status: 401
            })
        }
        await dbConnection()
        const { code, siteName } = await request.json()
        const siteNameExists = await User.findOne({siteName: siteName})
        if(siteNameExists){
            return NextResponse.json({
                'message': 'Site name is not available'
            },{
                status: 404
            })
        }
        const user = await User.findById(session.user.id);
        if(!user){
            return NextResponse.json({
                'message': 'User not found'
            },{
                status: 404
            })
        }
        user.siteName = siteName;
        user.code = code;
        await user.save();

        return NextResponse.json({
            'message': 'Your site has been published'
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