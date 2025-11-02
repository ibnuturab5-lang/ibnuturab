import mongoose from "mongoose";

const connectDB =async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('<<<<<<< MongoDB Connected! >>>>>>>'.cyan.bold)
    } catch (error) {
        console.log('Mongo Error:'.red.bold, err)
        process.exit(1)
    }
}
export default connectDB