import mongoose, { Schema } from "mongoose";
import User from "./User.js";


const schema = new mongoose.Schema({
    data: Object,
    userId: {
        type: Schema.Types.ObjectId,
        ref: User
    }
});


export default mongoose.model("Subscription", schema);