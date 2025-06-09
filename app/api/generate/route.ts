import { type FormData } from "@/app/start/page";
import { auth } from "@/auth";
import { promptToAi } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const deepseekApiKey = process.env.DEEPSEEK_API_KEY

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: deepseekApiKey
});

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
        const prompt: string = promptToAi(formData.goal, formData);
        
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "deepseek-chat",
        });    

        return NextResponse.json({
            'response' : completion.choices[0].message.content
        });

    }catch(error){
        console.log('an error occured ', error);
        return NextResponse.json({
                message: 'error occured in server'
            },{
                status: 500
        })
    }
}