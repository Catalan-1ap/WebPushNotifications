import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


const storageKey = "device-identifier";


export default function useDeviceIdentifier() {
    const [identifier, setIdentifier] = useState(null);

    useEffect(() => {
        let item = localStorage.getItem(storageKey);

        if (!item) {
            item = uuidv4();
            localStorage.setItem(storageKey, item);
        }

        setIdentifier(item);
    }, []);

    return identifier;
}