import { publicKey, subscribe, unsubscribe } from "./api.js";


export async function subscribeViaSpn(userId) {
	const permissionData = window.safari.pushNotification.permission("web.pushNotificationsExample");

	checkRemotePermission(permissionData);
}


function checkRemotePermission(permissionData) {
	if (permissionData.permission === "default") {
		window.safari.pushNotification.requestPermission(
			"https://pushnotificationsexample.ru",
			"web.pushNotificationsExample",
			{ test: "testData" },
			checkRemotePermission
		);
	} else if (permissionData.permission === "denied") {
		console.log("denied");
	} else if (permissionData.permission === "granted") {
		console.log(permissionData);
	}
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

	await subscribe(subscription, userId, deviceIdentifier);
}


export async function unsubscribeFromServerNotifications(userId) {
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