import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is connected!", /* connect.connection.host, connect.connection.name */)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}