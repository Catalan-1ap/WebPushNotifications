import { useUser } from "../contexts/UserContext.jsx";
import Enter from "./Enter/Enter.jsx";
import NotifiableUsers from "./NotifiableUsers.jsx";
import UserActions from "./UserActions/UserActions.jsx";


function App() {
    const { user } = useUser();

    return (
        <>
            {!user && <Enter/>}
            {user && <UserActions/>}
            <div style={{ marginTop: "2rem" }}>
                <NotifiableUsers/>
            </div>
        </>
    );
}

export default App;