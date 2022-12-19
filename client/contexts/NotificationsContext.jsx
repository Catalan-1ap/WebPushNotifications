import { createContext, useContext, useEffect, useState } from "react";
import useDeviceIdentifier from "../hooks/useDeviceIdentifier.js";
import { checkSubscription } from "../services/api.js";
import {
	isNotificationsAvailable,
	isSpnAvailable,
	subscribeViaPushApi,
	subscribeViaSpn,
	unsubscribeFromPushApi,
	unsubscribeFromSpn
} from "../services/notifications.js";
import { useUser } from "./UserContext.jsx";


const NotificationsContext = createContext({});


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

		if (!user)
			return;

		impl();
	}, [user]);

	async function subscribe() {
		if (isSpnAvailable())
			await subscribeViaSpn(user.id);
		else
			await subscribeViaPushApi(user.id, deviceIdentifier);

		setSubscribed(true);
	}

	async function unsubscribe() {
		if (isSpnAvailable())
			await unsubscribeFromSpn(user.id);
		else
			await unsubscribeFromPushApi(user.id, deviceIdentifier);

		setSubscribed(false);
	}

	return (
		<NotificationsContext.Provider value={{
			isAvailable: isNotificationsAvailable(),
			subscribed,
			subscribe,
			unsubscribe
		}}>
			{children}
		</NotificationsContext.Provider>
	);
}