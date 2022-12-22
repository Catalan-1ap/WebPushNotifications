import fs from "fs";
import http2 from "http2";
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


export function sendViaApple(title, body, deviceIdentifier) {
	const client = http2.connect("https://api.push.apple.com", {
		port: 443,
		cert: cert,
		key: key,
		passphrase: process.env.APPLE_PASSPHRASE,
	});
	const request = client.request({
		":scheme": "https",
		":method": "POST",
		":path": `/3/device/${deviceIdentifier}`
	});
	request.write(JSON.stringify({
		"aps": {
			"alert": {
				"title": title,
				"body": body
			},
			"url-args": []
		}
	}));
	request.on("end", () => client.close());
	request.end();
}