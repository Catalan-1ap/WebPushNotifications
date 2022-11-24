import { useUser } from "../../contexts/UserContext.jsx";
import { register } from "../../services/api.js";
import UserForm from "./UserForm.jsx";


function Register() {
    const { setUser } = useUser();

    async function sendRequest(event, { username, password }) {
        event.preventDefault();
        const res = await register({ username, password });
        setUser({
            id: res._id,
            username: res.username,
            password: res.password
        });
    }

    return <UserForm onSubmit={sendRequest} submitText="Register" title="Register"/>;
}

export default Register;