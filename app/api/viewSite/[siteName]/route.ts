import { NextRequest, NextResponse } from "next/server";
import { dbConnection } from "@/config/db";
import User from "@/models/user.model";

export const GET = async (
    request: NextRequest,
    { params }: { params: { siteName: string } }
    ): Promise<NextResponse> => {
    try {
            await dbConnection();
            const siteName = params.siteName;

            if (!siteName) {
                return NextResponse.json({ 
                    message: "Missing siteName" 
                }, { 
                    status: 400 
                });
            }

            const user = await User.findOne({ siteName }).select("code");

            if (!user) {
                return NextResponse.json({ 
                    message: "Site not found" 
                }, { 
                    status: 404 
                });
            }

            return NextResponse.json({ 
                code: user.code 
            });
    } catch {
            return NextResponse.json({ 
                message: "Internal Server Error" 
            }, 
            { 
                status: 500
            });
    }
};
