import { useState } from "react";


function UserForm({ onSubmit, submitText, title }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form>
            <h3>{title}</h3>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <button type="submit" onClick={e => onSubmit(e, { username, password })}>{submitText}</button>
        </form>
    );
}


export default UserForm;