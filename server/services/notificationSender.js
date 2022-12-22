import fs from "fs";
import https from "https";
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

	const request = https.request({
		host: "api.push.apple.com",
		port: 443,
		cert: cert,
		key: key,
		passphrase: process.env.APPLE_PASSPHRASE,
		headers: {
			":scheme": "https",
			":method": "POST",
			":path": `/3/device/${deviceIdentifier}`
		}
	});
	request.write(JSON.stringify(payload));
	request.end();

	// const apnProvider = new apn.Provider({
	// 	cert: cert,
	// 	key: key,
	// 	passphrase: process.env.APPLE_PASSPHRASE,
	// 	production: true
	// });
	// const notification = new apn.Notification(payload);
	// await apnProvider.send(notification, deviceIdentifier);
}