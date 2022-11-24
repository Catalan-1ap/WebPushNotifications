import express from "express";
import webPush from "web-push";
import Subscription from "../models/Subscription.js";


const router = express.Router();

router.get("/publicKey", async (req, res) => {
    res.status(200).send(process.env.VAPID_PUBLIC);
});

router.post("/subscribe", async (req, res) => {
    const { subscription, user } = req.body;

    const newSubscription = new Subscription({ data: subscription, user: user._id });
    await newSubscription.save();
    console.log(newSubscription);

    res.status(200).send();
});

router.post("/send", async (req, res) => {
    const { id } = req.body;

    const subscription = await Subscription
        .where("user._id").equals(id)
        .findOne()
        .exec();

    await webPush.sendNotification(subscription.data, JSON.stringify({ title: "Test Message" }));

    res.status(200).send();
});

export default router;