import { useNotifications } from "../../contexts/NotificationsContext.jsx";


function Notifications() {
	const { subscribed, subscribe, unsubscribe } = useNotifications();

	return (
		<>
			<label>
				Send me notifications
				<input type="checkbox"
				       checked={subscribed ?? false}
				       onChange={e => e.target.checked ? subscribe() : unsubscribe()}/>
			</label>
		</>
	);
}


export default Notifications;