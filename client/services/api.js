const baseRoute = import.meta.env.VITE_API_URL;


export async function notifiableUsers() {
    const res = await fetch(`${baseRoute}/inspect/notifiableUsers`).then(x => x.json());

    return res;
}


export async function register(user) {
    const res = await fetch(`${baseRoute}/users/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(x => x.json());

    return res;
}


export async function login(user) {
    const res = await fetch(`${baseRoute}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(x => x.json());

    return res;
}


export async function publicKey() {
    const res = await fetch(`${baseRoute}/notifications/publicKey`).then(x => x.text());

    return res;
}


export async function checkSubscription(userId) {
    const res = await fetch(`${baseRoute}/notifications/${userId}/checkSubscription`).then(x => x.json());

    return res;
}


export async function subscribe(subscription, userId, deviceIdentifier) {
    await fetch(`${baseRoute}/notifications/subscribe`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            subscription,
            userId,
            deviceIdentifier
        }),
    });
}


export async function unsubscribe(userId) {
    await fetch(`${baseRoute}/notifications/unsubscribe`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            userId
        }),
    });
}


export async function send(receiverId, title, options) {
    await fetch(`${baseRoute}/notifications/send`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            receiverId,
            title,
            options
        }),
    });
}