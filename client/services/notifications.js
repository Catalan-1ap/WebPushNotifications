import { publicKey, subscribe, unsubscribe } from "./api.js";


export function isSpnAllowed() {
	return window?.safari?.pushNotification?.permission("web.ru.pushnotificationsexample")?.permission;
}


export async function subscribeViaSpn(userId) {
	const permissionData = window.safari.pushNotification.permission("web.ru.pushnotificationsexample");

	const deviceIdentifier = await checkRemotePermission(permissionData);

	if (!deviceIdentifier)
		return;

	await subscribe({}, "apple", userId, deviceIdentifier);
}


function checkRemotePermission(permissionData) {
	return new Promise(resolve => {
		switch (permissionData.permission) {
			case "default":
				return requestSpnPermission();
				break;
			case "denied":
				resolve(null);
				break;
			case "granted":
				resolve(permissionData.deviceToken);
		}
	}).then(checkRemotePermission);
}


function requestSpnPermission() {
	return new Promise(resolve => {
		window.safari.pushNotification.requestPermission(
			"https://pushnotificationsexample.ru/api/spn",
			"web.ru.pushnotificationsexample",
			{},
			resolve
		);
	});
}


export async function subscribeViaPushApi(userId, deviceIdentifier) {
	const swRegistration = await navigator.serviceWorker.ready;
	let subscription = await swRegistration.pushManager.getSubscription();

	if (!subscription) {
		const key = await publicKey();
		const convertedKey = urlBase64ToUint8Array(key);
		subscription = await swRegistration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: convertedKey
		});
	}

	await subscribe(subscription, "google", userId, deviceIdentifier);
}


export async function unsubscribeFromSpn(userId) {
	await unsubscribe(userId);
}


export async function unsubscribeFromPushApi(userId) {
	const swRegistration = await navigator.serviceWorker.ready;
	const subscription = await swRegistration.pushManager.getSubscription();

	if (!subscription)
		return;

	await subscription.unsubscribe();
	await unsubscribe(userId);
}


export function isNotificationsAvailable() {
	return isServiceWorkerAndPushApiAvailable() || isSpnAvailable();
}


export function isServiceWorkerAndPushApiAvailable() {
	return "serviceWorker" in navigator && "PushManager" in window;
}


export function isSpnAvailable() {
	return "safari" in window && "pushNotification" in window.safari;
}


function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
	.replace(/\-/g, "+")
	.replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}