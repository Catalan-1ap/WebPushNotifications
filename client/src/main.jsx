import React from "react";
import ReactDOM from "react-dom/client";
import { NotificationsProvider } from "../contexts/NotificationsContext";
import { UserProvider } from "../contexts/UserContext.jsx";
import App from "./App.jsx";


navigator.serviceWorker
    .register("./notificationsServiceWorker.js", {
        scope: "/"
    })
    .then(() => navigator.serviceWorker.ready)
    .then(() => {
        ReactDOM.createRoot(document.getElementById("root")).render(
            <React.StrictMode>
                <UserProvider>
                    <NotificationsProvider>
                        <App/>
                    </NotificationsProvider>
                </UserProvider>
            </React.StrictMode>
        );
    });