import { type FormData } from "@/app/start/page";
import { auth } from "@/auth";
import { promptToAi } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";

export const POST = async (request: NextRequest): Promise<NextResponse> =>{
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({
                message: 'Unauthorized'
            },{
                status: 401
            })
        }
        const formData:FormData = await request.json()
        const together = new Together();
        
        const response = await together.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: promptToAi(formData.goal, formData)
                }
            ],
            model: "deepseek-ai/DeepSeek-V3"
        });
        const responseFromAi = response?.choices[0]?.message?.content;

        return NextResponse.json({
            'response' : responseFromAi
        });

    }catch{
        console.log('an error occured');
        return NextResponse.json({
                message: 'error occured in server'
            },{
                status: 500
        })
    }
}