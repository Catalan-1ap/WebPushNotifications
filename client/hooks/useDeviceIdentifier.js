import { useEffect, useState } from "react";


const storageKey = "device-identifier";


export default function useDeviceIdentifier() {
    const [identifier, setIdentifier] = useState(null);

    useEffect(() => {
        let item = localStorage.getItem(storageKey);

        if (!item) {
            const deviceInfo = navigator.userAgent.match(/(\(([^)])+\))/)[0];
            item = `${screen.height}h-${screen.width}w-${window.devicePixelRatio}px-${deviceInfo}`;
            localStorage.setItem(storageKey, item);
        }

        setIdentifier(item);
    }, []);

    return identifier;
}