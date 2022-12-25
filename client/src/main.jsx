import React from "react";
import ReactDOM from "react-dom/client";
import { NotificationsProvider } from "../contexts/NotificationsContext";
import { UserProvider } from "../contexts/UserContext.jsx";
import { isServiceWorkerAndPushApiAvailable } from "../services/notifications.js";
import App from "./App.jsx";


try {
	ReactDOM.createRoot(document.getElementById("root")).render(
		<React.StrictMode>
			<UserProvider>
				<NotificationsProvider>
					<App/>
				</NotificationsProvider>
			</UserProvider>
		</React.StrictMode>
	);

	if (isServiceWorkerAndPushApiAvailable())
		navigator.serviceWorker
		         .register("./notificationsServiceWorker.js", {
			         scope: "/"
		         })
		         .then(() => navigator.serviceWorker.ready);
} catch (e) {
	console.error(e);
}
