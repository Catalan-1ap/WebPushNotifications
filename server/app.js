import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import webPush from "web-push";
import mongoConnect from "./config/mongoConnect.js";
import inspect from "./routes/inspect.js";
import notifications from "./routes/notifications.js";
import users from "./routes/users.js";


dotenv.config();
await mongoConnect();
webPush.setVapidDetails(
    "https://site.com/",
    process.env.VAPID_PUBLIC,
    process.env.VAPID_PRIVATE
);

const app = express();
const router = express.Router();

app.use(cors()); // change cors to deployed frontend
app.use(express.json());
app.use("/api", router);
router.use("/users", users);
router.use("/notifications", notifications);
router.use("/inspect", inspect);

export default app;