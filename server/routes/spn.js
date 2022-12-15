import express from "express";
import path from "path";


const router = express.Router();

router.post("/:version/pushPackages/:website", async (req, res) => {
	const packagePath = path.resolve("./public/pushPackage.zip");

	res.status(200).sendFile(packagePath);
});

router.post("/:version/devices/:device/registrations/:website", async (req, res) => {
	res.status(200).send();
});

router.delete("/:version/devices/:device/registrations/:website", async (req, res) => {
	res.status(200).send();
});

router.delete("/:version/log", async (req, res) => {
	console.log(req.body);
	res.status(200).send();
});

export default router;