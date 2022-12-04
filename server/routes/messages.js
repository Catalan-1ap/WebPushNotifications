import express from "express";
import Message from "../models/Message.js";


const router = express.Router();

router.get("/:userId", async (req, res) => {
	const userId = req.params.userId;

	const messages = await Message.find({ receiverId: userId }).exec();

	res.status(200).send(messages);
});

export default router;
