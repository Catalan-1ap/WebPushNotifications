import mongoose from "mongoose";


const schema = new mongoose.Schema({
    username: String,
    password: String
});


export default mongoose.model("User", schema);