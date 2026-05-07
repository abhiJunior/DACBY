import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
console.log("password",process.env.DB_PASSWORD)

const connectToDB = async()=>{
    try{
        const {connection} = await mongoose.connect(
            `mongodb+srv://userdb:${process.env.DB_PASSWORD}@cluster0.hkbuoog.mongodb.net/dacby`
        )
        if (connection){
            console.log(`connected to DB Successfully at ${connection.host}`)
        }
    }catch(e){
        console.log("Failed to connect to DB",e.message)
    }
}

export default connectToDB