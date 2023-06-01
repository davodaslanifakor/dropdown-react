import { useEffect, KeyboardEvent, RefObject } from "react";

type KeyCallbackMap = {
    [key: string]: () => void;
};

type KeyboardEventTarget = HTMLElement | Window | Document;

const isKeyboardEvent = <T extends KeyboardEventTarget>(
    event: unknown
): event is KeyboardEvent<T> => (event as KeyboardEvent<T>).key !== undefined;

const useGlobalKeyboard = (keyCallbacks: KeyCallbackMap) => {
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

const useElementKeyboard = <T extends HTMLElement>(
    elementRef: RefObject<T>,
    keyCallbacks: KeyCallbackMap
) => {
    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleKeyDown = (event: Event) => {
            if (isKeyboardEvent(event)) {
                const { key } = event;
                if (key in keyCallbacks) {
                    event.preventDefault();
                    keyCallbacks[key]();
                }
            }
        };

        element.addEventListener("keydown", handleKeyDown);

        return () => {
            element.removeEventListener("keydown", handleKeyDown);
        };
    }, [elementRef, keyCallbacks]);
};

export { useGlobalKeyboard, useElementKeyboard };
