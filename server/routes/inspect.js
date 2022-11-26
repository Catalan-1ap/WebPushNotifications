import express from "express";
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

export default router;