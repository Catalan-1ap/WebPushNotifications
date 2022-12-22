import axios from "axios";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import webPush from "web-push";


const appleKey = fs.readFileSync(path.resolve("./public/AppleAuthKey.p8"));
let appleJwt = {};


export async function sendViaGoogle(subscription, title, receiverId, options) {
	return await webPush.sendNotification(subscription, JSON.stringify({
		title,
		options,
		receiverId
	}));
}


export async function sendViaApple(title, body, deviceIdentifier) {
	// For security, APNs requires you to refresh your token regularly. Refresh your token no more than
	// once every 20 minutes and no less than once every 60 minutes. APNs rejects any request whose
	// token contains a timestamp that is more than one hour old. Similarly, APNs reports an error if
	// you recreate your tokens more than once every 20 minutes.
	if (!appleJwt.token || getTimeDifferenceInMinutes(appleJwt.createdAt) > 50)
		recreateAppleJwt();

	const payload = {
		"aps": {
			"alert": {
				"title": "Game Request",
				"subtitle": "Five Card Draw",
				"body": "Bob wants to play poker"
			}
		},
	};

	return await axios.post("https://api.sandbox.push.apple.com", payload, {
		headers: {
			":method": "POST",
			":path": `/3/device/${deviceIdentifier}`,
			"authorization": `bearer ${appleJwt.token}`,
		},
	});
}


function recreateAppleJwt() {
	appleJwt.createdAt = new Date();
	appleJwt.token = jwt.sign(
		{
			iss: process.env.APPLE_TEAMID,
			iat: dateToSeconds(appleJwt.createdAt)
		},
		appleKey,
		{
			header: {
				alg: "ES256",
				kid: process.env.APPLE_KEYID,
			}
		}
	);
}


function getTimeDifferenceInMinutes(target) {
	const now = new Date();
	const diffMs = (target - now);

	return Math.round(((diffMs % 86400000) % 3600000) / 60000);
}


function dateToSeconds(date) {
	return date / 1000;
}