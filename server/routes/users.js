import express from "express";
import User from "../models/User.js";


const router = express.Router();

router.post("/new", async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(200).send(newUser);
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User
        .where("username").equals(username)
        .where("password").equals(password)
        .findOne()
        .exec();

    if (!user)
        return res.status(404).send();

    res.status(200).send(user);
});

export default router;