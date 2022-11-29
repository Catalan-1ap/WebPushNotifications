import express from "express";
import webPush from "web-push";
import Subscription from "../models/Subscription.js";


const router = express.Router();

router.get("/notifiableUsers", async (req, res) => {
    const users = await Subscription
        .aggregate()
        .lookup({ from: "users", localField: "owner", foreignField: "_id", as: "owner" })
        .unwind("owner")
        .project({ _id: "$owner._id", username: "$owner.username", deviceIdentifier: 1 })
        .exec();

    res.status(200).send(users);
});

router.get("/:receiverId/send", async (req, res) => {
    const receiverId = req.params.receiverId;

    setTimeout(async () => {
        try {
            const subscriptions = await Subscription.find({ owner: receiverId }).exec();

            const notifications = subscriptions.map(async subscription => {
                await webPush.sendNotification(subscription.data, JSON.stringify({ title: "Заголовок" }));
            });
            await Promise.all(notifications);
        } catch (e) {
            console.error(e);
        }
    }, 5000);

    res.status(200).send();
});

export default router;