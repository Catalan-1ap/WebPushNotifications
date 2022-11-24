import { useUser } from "../../contexts/UserContext.jsx";
import Logout from "./Logout.jsx";
import Notifications from "./Notifications.jsx";


function UserActions() {
    const { user } = useUser();

    return (
        <>
            <h2>Id: {user.id}</h2>
            <h2>Username: {user.username}</h2>
            <h2>Password: {user.password}</h2>

            <Logout/>
            <Notifications/>
        </>
    );
}


export default UserActions;