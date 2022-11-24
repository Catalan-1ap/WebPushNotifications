import { publicKey, subscribe } from "./api.js";


export async function subscribeToServerNotifications(user) {
    await navigator.serviceWorker.register("./notificationsServiceWorker.js", {
        scope: "/"
    });
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
        const key = await publicKey();
        const convertedKey = urlBase64ToUint8Array(key);
        subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedKey
        });
    }

    await subscribe(subscription, user);
}


export async function unsubscribeFromServerNotifications() {

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