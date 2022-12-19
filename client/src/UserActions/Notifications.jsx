import { useNotifications } from "../../contexts/NotificationsContext.jsx";
import { isSpnAllowed } from "../../services/notifications.js";


function Notifications() {
	const { subscribed, subscribe, unsubscribe } = useNotifications();

	return (
		<>
			<label>
				Send me notifications
				<input type="checkbox"
				       checked={subscribed}
				       disabled={Notification.permission === "denied" || isSpnAllowed() === "denied"}
				       onChange={e => e.target.checked ? subscribe() : unsubscribe()}/>
			</label>
		</>
	);
}


export default Notifications;