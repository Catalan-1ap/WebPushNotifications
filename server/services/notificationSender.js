import fs from "fs";
import https from "https";
import jwt from "jsonwebtoken";
import path from "path";
import webPush from "web-push";


const appleKey = fs.readFileSync(path.resolve("./public/AppleAuthKey.p8"));
let appleJwt = {};


export function sendViaGoogle(subscription, title, receiverId, options) {
	webPush.sendNotification(subscription, JSON.stringify({
		title,
		options,
		receiverId
	}));
}


export function sendViaApple(title, body, deviceIdentifier) {
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

	const request = https.request("https://api.sandbox.push.apple.com", {
		headers: {
			":method": "POST",
			":path": `/3/device/${deviceIdentifier}`,
			"authorization": `bearer ${appleJwt.token}`
		}
	}, res => {
		console.log(res);
	});
	request.write(JSON.stringify(payload));
	request.end();
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