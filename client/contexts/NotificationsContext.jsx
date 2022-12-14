import { createContext, useContext, useEffect, useState } from "react";
import useDeviceIdentifier from "../hooks/useDeviceIdentifier.js";
import { checkSubscription } from "../services/api.js";
import {
	isNotificationsAvailable,
	isSpnAllowed,
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
			const spnAllowed = isSpnAllowed();

			if (isSubscribed && spnAllowed === "granted")
				await subscribe();
			else if (isSubscribed && !spnAllowed)
				await subscribe();
			else if (spnAllowed === "default")
				return;

			setSubscribed(isSubscribed);
		}

		if (!user)
			return;

		impl();
	}, [user]);

	async function subscribe() {
		try {
			if (isSpnAvailable())
				await subscribeViaSpn(user.id);
			else
				await subscribeViaPushApi(user.id, deviceIdentifier);
		} catch (e) {
			setSubscribed(false);
			throw e;
		}

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