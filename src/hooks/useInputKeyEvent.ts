import { useEffect, KeyboardEvent, RefObject } from "react";

type KeyCallbackMap = {
    [key: string]: () => void;
};

const isKeyboardEvent = (event: unknown): event is KeyboardEvent<HTMLInputElement> =>
    (event as KeyboardEvent<HTMLInputElement>).key !== undefined;

const useInputKeyEvent = (
    inputRef: RefObject<HTMLInputElement>,
    keyCallbacks: KeyCallbackMap
) => {
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

        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener("keydown", handleKeyDown);
            }
        };
    }, [inputRef, keyCallbacks]);
};

export default useInputKeyEvent;
