import * as apn from "apn";
import fs from "fs";
import path from "path";
import webPush from "web-push";


const cert = fs.readFileSync(path.resolve("./public/apns-pro-cert.pem"));
const key = fs.readFileSync(path.resolve("./public/apns-pro-key.pem"));


export async function sendViaGoogle(subscription, title, receiverId, options) {
	await webPush.sendNotification(subscription, JSON.stringify({
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
		key: key,
		passphrase: process.env.APPLE_PASSPHRASE,
		production: true
	});
	const notification = new apn.Notification(payload);
	await apnProvider.send(notification, deviceIdentifier);
}