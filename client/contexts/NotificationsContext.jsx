import { createContext, useContext, useEffect, useState } from "react";
import useDeviceIdentifier from "../hooks/useDeviceIdentifier.js";
import { isSubscribed } from "../services/api.js";
import { subscribeToServerNotifications, unsubscribeFromServerNotifications } from "../services/notifications.js";
import { useUser } from "./UserContext.jsx";


const NotificationsContext = createContext();


export function useNotifications() {
    return useContext(NotificationsContext);
}


export function NotificationsProvider({ children }) {
    const { user } = useUser();
    const [subscribed, setSubscribed] = useState(false);
    const deviceIdentifier = useDeviceIdentifier();

    useEffect(() => {
        async function impl() {
            const subscribeStatus = await isSubscribed(user.id);

            setSubscribed(subscribeStatus);
            if (subscribeStatus)
                await subscribe();
        }

        if (Notification.permission === "denied" || !user)
            return;

        impl();
    }, [user]);

    async function subscribe() {
        setSubscribed(true);
        await subscribeToServerNotifications(user.id, deviceIdentifier);
    }

    async function unsubscribe() {
        setSubscribed(false);
        await unsubscribeFromServerNotifications(user.id);
    }

    return (
        <NotificationsContext.Provider value={{ subscribed, subscribe, unsubscribe }}>
            {children}
        </NotificationsContext.Provider>
    );
}