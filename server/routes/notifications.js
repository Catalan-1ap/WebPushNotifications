import express from "express";
import webPush from "web-push";
import Message from "../models/Message.js";
import Subscription from "../models/Subscription.js";


const router = express.Router();

router.get("/publicKey", async (req, res) => {
	res.status(200).send(process.env.VAPID_PUBLIC);
});

router.get("/:userId/checkSubscription", async (req, res) => {
	const userId = req.params.userId;

	const subscription = await Subscription.findOne({ owner: userId }).exec();

	res.status(200).send(!!subscription);
});

router.post("/subscribe", async (req, res) => {
	const { subscription, type, userId, deviceIdentifier } = req.body;

	await Subscription.deleteOne({ owner: userId, deviceIdentifier }).exec();
	const newSubscription = new Subscription({
		data: subscription,
		type: type,
		owner: userId,
		deviceIdentifier
	});
	await newSubscription.save();

	res.status(201).send();
});

router.post("/unsubscribe", async (req, res) => {
	const { userId } = req.body;

	await Message.deleteMany({ receiverId: userId }).exec();
	await Subscription.deleteMany({ owner: userId }).exec();

	res.status(200).send();
});

router.post("/send", async (req, res) => {
	const { receiverId, title, options } = req.body;

	try {
		const subscriptions = await Subscription.find({ owner: receiverId }).exec();
		const userMessage = new Message({ title, body: options.body, receiverId: receiverId });

		await userMessage.save();
		const notifications = subscriptions.map(async subscription => {
			await webPush.sendNotification(subscription.data, JSON.stringify({
				title,
				options,
				receiverId
			}));
		});
		await Promise.all(notifications);
	} catch (e) {
		console.error(e);
	}

	res.status(200).send();
});

export default router;