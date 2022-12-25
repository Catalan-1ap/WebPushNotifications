import { useUser } from "../../contexts/UserContext.jsx";
import { login } from "../../services/api.js";
import UserForm from "./UserForm.jsx";


function Login() {
    const { setUser } = useUser();

    async function sendRequest(event, { username, password }) {
        event.preventDefault();
        const res = await login({ username, password });
        console.log("logged user:", res);
        setUser({
            id: res._id,
            username: res.username,
            password: res.password
        });
    }

    return <UserForm onSubmit={sendRequest} submitText="Login" title="Login"/>;
}


export default Login;