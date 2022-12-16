import React from "react";
import ReactDOM from "react-dom/client";
import { NotificationsProvider } from "../contexts/NotificationsContext";
import { UserProvider } from "../contexts/UserContext.jsx";
import { isNotificationsAvailable } from "../services/notifications.js";
import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserProvider>
			<NotificationsProvider>
				<App/>
			</NotificationsProvider>
		</UserProvider>
	</React.StrictMode>
);

if (isNotificationsAvailable())
	navigator.serviceWorker
	         .register("./notificationsServiceWorker.js", {
		         scope: "/"
	         })
	         .then(() => navigator.serviceWorker.ready);
