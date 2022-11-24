import mongoose from "mongoose";


export default async function mongoConnect() {
    await mongoose.connect('mongodb://localhost:27017/main', {
        authSource: "admin",
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD,
    });
}