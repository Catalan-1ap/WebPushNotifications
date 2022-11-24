import { useUser } from "../contexts/UserContext.jsx";
import Enter from "./Enter/Enter.jsx";
import UserActions from "./UserActions/UserActions.jsx";


function App() {
    const { user } = useUser();

    return (
        <>
            {!user && <Enter/>}
            {user && <UserActions/>}
        </>
    );
}

export default App;