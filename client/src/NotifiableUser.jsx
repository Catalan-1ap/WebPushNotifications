import { useState } from "react";
import { send } from "../services/api.js";
import { currySetter } from "../utils.js";


function NotifiableUser({ id, deviceIdentifier, type, username }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [icon, setIcon] = useState("");
    const [silent, setSilent] = useState(false);

    return (
        <>
            <h4>Username: {username}, Id: {id}</h4>
            <h5>DeviceIdentifier: {deviceIdentifier}</h5>

            <label>
                Title:
                <input type="text" value={title} onChange={currySetter(setTitle)}/>
            </label>
            <br/>
            <label>
                Body:
                <input type="text" value={body} onChange={currySetter(setBody)}/>
            </label>
            <br/>
            {type === "google" && <label>
                IconUrl:
                <input type="text" value={icon} onChange={currySetter(setIcon)}/>
            </label>}
            <br/>
            {type === "google" && <label>
                Silent:
                <input type="checkbox" checked={silent} onChange={(e) => setSilent(e.target.checked)}/>
            </label>}
            <br/>
            <button onClick={() => send(id, title, { body, icon, silent })}>Send Notification</button>
        </>
    );
}


export default NotifiableUser;