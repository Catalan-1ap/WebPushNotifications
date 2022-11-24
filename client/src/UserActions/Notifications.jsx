import { useUser } from "../../contexts/UserContext.jsx";
import { send } from "../../services/api.js";
import { subscribeToServerNotifications, unsubscribeFromServerNotifications } from "../../services/notifications.js";


function Notifications() {
    const { user } = useUser();

    async function subscribe() {
        await subscribeToServerNotifications(user);
    }

    async function sendToMe() {
        await send(user.id);
    }

    return (
        <>
            <label>
                Send me notifications
                <input type="checkbox"
                       onChange={e => e.target.checked ? subscribe() : unsubscribeFromServerNotifications()}/>
            </label>
            <button onClick={sendToMe}>Send To Me</button>
        </>
    );
}


export default Notifications;