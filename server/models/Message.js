import mongoose, { Schema } from "mongoose";
import User from "./User.js";


const messageSchema = new mongoose.Schema({
	title: String,
	body: String,
	receiverId: {
		type: Schema.Types.ObjectId,
		ref: User
	},
});


export default mongoose.model("Message", messageSchema);