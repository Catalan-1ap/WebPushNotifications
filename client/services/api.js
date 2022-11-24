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


export async function subscribe(subscription, user) {
    await fetch(`${baseRoute}/notifications/subscribe`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            subscription,
            user
        }),
    });

    console.log("subscribe", { subscription, user });
}


export async function send(receiverId) {
        await fetch(`${baseRoute}/notifications/send`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: receiverId
            }),
        });
}