import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import webPush from "web-push";
import mongoConnect from "./config/mongoConnect.js";
import inspect from "./routes/inspect.js";
import messages from "./routes/messages.js";
import notifications from "./routes/notifications.js";
import spn from "./routes/spn.js";
import users from "./routes/users.js";


dotenv.config();
await mongoConnect();
webPush.setVapidDetails(
	"https://pushnotificationsexample.ru",
	process.env.VAPID_PUBLIC,
	process.env.VAPID_PRIVATE
);

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use("/api", router);
router.use("/users", users);
router.use("/notifications", notifications);
router.use("/messages", messages);
router.use("/inspect", inspect);
router.use("/spn", spn);

app.listen(process.env.PORT || 3000, () => console.log("Listening..."));