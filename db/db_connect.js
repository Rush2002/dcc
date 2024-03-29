
import mongoose from "mongoose";


export const connect_DB = async (DATABASE_URL) => {
    try {
        await mongoose.connect(DATABASE_URL,{dbName:"dcc"});
        console.log("database connection successful...");
    } catch (error) {
        console.log("error while connecting to database...")
    }
}


