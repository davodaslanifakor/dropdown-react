import { useEffect, KeyboardEvent } from "react";

type KeyCallbackMap = {
    [key: string]: () => void;
};

const isKeyboardEvent = (event: unknown): event is KeyboardEvent => {
    return (event as KeyboardEvent).key !== undefined;
};

const useGlobalKeyDown = (keyCallbacks: KeyCallbackMap) => {
    useEffect(() => {
        const handleKeyDown = (event: Event) => {
            if (isKeyboardEvent(event) && event.target instanceof HTMLInputElement) {
                const { key } = event;
                if (key in keyCallbacks) {
                    event.preventDefault();
                    keyCallbacks[key]();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [keyCallbacks]);
};

export default useGlobalKeyDown;
