import { useUser } from "../../contexts/UserContext.jsx";


function Logout() {
    const { setUser } = useUser();

    async function logout() {
        setUser(null)
    }

    return (
        <button onClick={logout}>Logout</button>
    );
}


export default Logout;