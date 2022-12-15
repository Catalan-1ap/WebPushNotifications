import express from "express";
import path from "path";


const router = express.Router();

router.post("/v2/pushPackages/:website", async (req, res) => {
	const packagePath = path.resolve("./public/pushPackage.zip");

	res.status(200).sendFile(packagePath);
});

router.post("/v2/devices/:device/registrations/:website", async (req, res) => {
	res.status(200).send();
});

router.delete("/v2/devices/:device/registrations/:website", async (req, res) => {
	res.status(200).send();
});

router.delete("/v2/log", async (req, res) => {
	console.log(req.body);
	res.status(200).send();
});

export default router;