const baseRoute = "http://192.168.0.100:3000/api";

export async function register(user) {
    const res = await fetch(`${baseRoute}/users/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(x => x.json());

    console.log("register", res);

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

    console.log("login", res);

    return res;
}


export async function publicKey() {
    const res = await fetch(`${baseRoute}/notifications/publicKey`).then(x => x.text());

    console.log("publicKey", res);

    return res;
}


export async function isSubscribed(userId) {
    const res = await fetch(`${baseRoute}/notifications/${userId}/isSubscribed`).then(x => x.json());

    console.log("isSubscribed", { res });
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

    console.log("subscribe", { subscription, userId, deviceIdentifier });
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

    console.log("unsubscribe", { userId });
}


export async function send(receiverId) {
    await fetch(`${baseRoute}/notifications/send`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            receiverId
        }),
    });
}