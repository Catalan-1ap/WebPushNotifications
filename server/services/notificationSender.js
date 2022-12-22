import * as apn from "apn";
import fs from "fs";
import path from "path";
import webPush from "web-push";


const cert = fs.readFileSync(path.resolve("./public/apns-pro.pem"));


export async function sendViaGoogle(subscription, title, receiverId, options) {
	return await webPush.sendNotification(subscription, JSON.stringify({
		title,
		options,
		receiverId
	}));
}


export async function sendViaApple(title, body, deviceIdentifier) {
	const payload = {
		"aps": {
			"alert": {
				"title": title,
				"body": body
			},
			"url-args": []
		},
	};

	const apnProvider = new apn.Provider({
		cert: cert,
		passphrase: process.env.APPLE_PASSPHRASE,
		production: true
	});
	const notification = new apn.Notification(payload);
	const res = await apnProvider.send(notification, deviceIdentifier);

	console.log(res);
}