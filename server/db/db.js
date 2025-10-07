import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const connectdb = async () => {

    await mongoose.connect(process.env.DB_URI)
        .then(() =>
            console.log("mongodb is connecteD"))
        .catch((err) => {
            console.log("mongodb is not conected", err);
        })

}

export default connectdb;