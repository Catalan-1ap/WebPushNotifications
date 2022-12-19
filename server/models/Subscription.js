import mongoose, { Schema } from "mongoose";
import User from "./User.js";


const subscriptionSchema = new mongoose.Schema({
    data: Object,
    type: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    deviceIdentifier: String
});


export default mongoose.model("Subscription", subscriptionSchema);