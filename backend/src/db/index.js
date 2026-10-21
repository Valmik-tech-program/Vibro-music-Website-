import mongoose from "mongoose"

const connectDb = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoose connced sussesfully")
        
    } catch (error) {
        console.error("eror in connect in mongo", error)
    }
}

export default connectDb