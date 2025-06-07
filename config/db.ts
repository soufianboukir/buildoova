import mongoose from "mongoose";

const dbUrl = process.env.DBURL as string ?? 'mongodb://127.0.0.1:27017/buildoova'
export const dbConnection = async () =>{
    try{
        await mongoose.connect(dbUrl)
    }catch{
        console.log("Error while connecting to db");
        
    }
}