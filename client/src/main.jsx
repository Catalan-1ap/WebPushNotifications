import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "../contexts/UserContext.jsx";
import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserProvider>
            <App/>
        </UserProvider>
    </React.StrictMode>
);
