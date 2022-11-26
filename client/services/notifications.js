import { publicKey, subscribe, unsubscribe } from "./api.js";


await navigator.serviceWorker.register("./notificationsServiceWorker.js", {
    scope: "/"
});
const swRegistration = await navigator.serviceWorker.ready;


export async function subscribeToServerNotifications(userId, deviceIdentifier) {
    if (!isServiceWorkerAndPushApiAvailable()) {
        console.error("ServiceWorker and Push not available");
        return;
    }

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
    if (!isServiceWorkerAndPushApiAvailable()) {
        return;
    }

    const subscription = await swRegistration.pushManager.getSubscription();

    if (!subscription)
        return;

    await subscription.unsubscribe();
    await unsubscribe(userId);
}


function isServiceWorkerAndPushApiAvailable() {
    return "serviceWorker" in navigator && "PushManager" in window;
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