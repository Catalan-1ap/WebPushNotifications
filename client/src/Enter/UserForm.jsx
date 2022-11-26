import { useState } from "react";
import { currySetter } from "../../utils.js";


function UserForm({ onSubmit, submitText, title }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form>
            <h3>{title}</h3>
            <label>
                Username:
                <input type="text" value={username} onChange={currySetter(setUsername)}/>
            </label>
            <br/>
            <label>
                Password:
                <input type="text" value={password} onChange={currySetter(setPassword)}/>
            </label>
            <br/>
            <button type="submit" onClick={e => onSubmit(e, { username, password })}>{submitText}</button>
        </form>
    );
}


export default UserForm;