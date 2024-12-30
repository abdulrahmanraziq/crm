import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const url = `${process.env.MONGO_URI}/${process.env.MONGODB_DB_DB}`;

 const connectDB = async () => {
    return mongoose 
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
}

export default connectDB;

