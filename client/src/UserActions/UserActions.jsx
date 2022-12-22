import { useNotifications } from "../../contexts/NotificationsContext.jsx";
import { useUser } from "../../contexts/UserContext.jsx";
import Logout from "./Logout.jsx";
import Messages from "./Messages.jsx";
import Notifications from "./Notifications.jsx";


function UserActions() {
	const { user } = useUser();
	const { subscribed, isAvailable } = useNotifications();

	return (
		<div style={{ display: "flex" }}>
			<div>
				<h2>Id: {user.id}</h2>
				<h2>Username: {user.username}</h2>
				<h2>Password: {user.password}</h2>

				<Logout/>
				{isAvailable && <Notifications/>}
			</div>

			<div style={{ marginLeft: "10rem", display: "flex" }}>
				<h2 style={{ marginRight: "5rem" }}>Messages: </h2>
				<div style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
					<Messages/>
				</div>
			</div>
		</div>
	);
}


export default UserActions;