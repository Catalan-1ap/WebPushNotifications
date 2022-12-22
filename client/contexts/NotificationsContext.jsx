import { createContext, useContext, useState } from "react";
import useDeviceIdentifier from "../hooks/useDeviceIdentifier.js";
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