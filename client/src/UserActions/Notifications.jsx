import { useNotifications } from "../../contexts/NotificationsContext.jsx";
import { useUser } from "../../contexts/UserContext.jsx";
import { send } from "../../services/api.js";


function Notifications() {
    const { user } = useUser();
    const { subscribed, subscribe, unsubscribe } = useNotifications();


    async function sendToMe() {
        await send(user.id);
    }

    return (
        <>
            <label>
                Send me notifications
                <input type="checkbox"
                       checked={subscribed}
                       disabled={Notification.permission === "denied"}
                       onChange={e => e.target.checked ? subscribe() : unsubscribe()}/>
            </label>
            <button onClick={sendToMe}>Send To Me</button>
        </>
    );
}


export default Notifications;