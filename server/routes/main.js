import express from "express";


const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD
    });
});

export default router;