import { useEffect, useState } from "react";
import { useNotifications } from "../contexts/NotificationsContext.jsx";
import { notifiableUsers } from "../services/api.js";
import NotifiableUser from "./NotifiableUser.jsx";


function NotifiableUsers() {
    const { subscribed } = useNotifications();
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        const res = await notifiableUsers();
        setUsers(res);
    }

    useEffect(() => {
        fetchUsers();
    }, [subscribed]);

    return (
        <>
            {users.length > 0 && (
                <>
                    <hr/>
                    {users.map(user => (
                        <div key={user.deviceIdentifier}>
                            <NotifiableUser id={user._id}
                                            username={user.username}
                                            type={user.type}
                                            deviceIdentifier={user.deviceIdentifier}/>
                            <hr/>
                        </div>
                    ))}
                    <button onClick={fetchUsers}>Refresh</button>
                </>
            )}
        </>
    );
}


export default NotifiableUsers;