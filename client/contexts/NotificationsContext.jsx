import { createContext, useContext, useEffect, useState } from "react";
import useDeviceIdentifier from "../hooks/useDeviceIdentifier.js";
import { checkSubscription } from "../services/api.js";
import {
	isServiceWorkerAndPushApiAvailable,
	subscribeToServerNotifications,
	unsubscribeFromServerNotifications
} from "../services/notifications.js";
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
			const isSubscribed = await checkSubscription(user.id);

			setSubscribed(isSubscribed);
			if (isSubscribed)
				await subscribe();
		}

		if (Notification.permission === "denied" || !user)
			return;

		impl();
	}, [user]);

	async function subscribe() {
		await subscribeToServerNotifications(user.id, deviceIdentifier);
		setSubscribed(true);
	}

	async function unsubscribe() {
		await unsubscribeFromServerNotifications(user.id);
		setSubscribed(false);
	}

	return (
		<NotificationsContext.Provider value={{
			isAvailable: isServiceWorkerAndPushApiAvailable(),
			subscribed,
			subscribe,
			unsubscribe
		}}>
			{children}
		</NotificationsContext.Provider>
	);
}