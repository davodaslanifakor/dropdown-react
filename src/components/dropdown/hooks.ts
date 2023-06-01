import {ChangeEvent, useEffect, useRef, useState} from "react";
import {DropdownOutput, Params} from "./types";
import {useGlobalKeyboard, useElementKeyboard} from "../../hooks/useKeyboard";


export const useDropdown = ({items, onSelect, value}: Params): DropdownOutput => {
    const [options, setOptions] = useState<Set<string>>(new Set(items));
    const [inputValue, setValue] = useState<string>(value || '');
    const [indexActive, setIndexActive] = useState<number>(-1);
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const activeItemRef = useRef<HTMLLIElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleOpenMenu = () => {
        setMenuOpen(true);
    };

    const handleCloseMenu = () => {
        // TODO Check Alternative solution
        setTimeout(() => {
            setMenuOpen(false);
        }, 168)
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        setIndexActive(-1);
        if (!isMenuOpen) {
            handleOpenMenu()
        }
    };

    const handleSelectItem = (item: string, index: number) => {
        setValue(item);
        setIndexActive(index);
        if (onSelect) {
            onSelect(item);
        }
    };

    const handleAddItem = () => {
        if (indexActive !== -1) {
            const activeItem = Array.from(options)[indexActive];
            setValue(activeItem);
            if (onSelect) {
                onSelect(activeItem);
            }
            handleCloseMenu()
        } else if (inputValue.trim() !== '') {
            if (options.has(inputValue)) {
                return; // Ignore adding duplicate value
            }
            setOptions((prev) => new Set([inputValue, ...Array.from(prev)]));
            setIndexActive(0);
            setValue('');
            if (onSelect) {
                onSelect(inputValue);
            }
        }
    };

    const handleArrowUp = () => {
        setIndexActive((prev) => (prev > 0 ? prev - 1 : prev));

    };

    const handleArrowDown = () => {
        setIndexActive((prev) => (prev < options.size - 1 ? prev + 1 : prev));
    };

    const handleEnter = () => {
        handleAddItem();
    };

    const keyCallbacks = {
        ArrowUp: handleArrowUp,
        ArrowDown: handleArrowDown,
        Enter: handleEnter,
    };

    useElementKeyboard(inputRef,keyCallbacks);


    const handleEscape = () => {
        inputRef.current?.blur();
        handleCloseMenu()
        if (indexActive === -1) {
            setValue('')
            if (onSelect) {
                onSelect('')
            }
        }
    };

    const globalKeyCallbacks = {
        Escape: handleEscape,
    };


    useGlobalKeyboard(globalKeyCallbacks);

    useEffect(() => {
        if (activeItemRef.current && activeItemRef.current.scrollIntoView) {
            activeItemRef.current.scrollIntoView({
                block: 'center',
            });
        }
    }, [indexActive]);

    return {
        inputValue,
        options,
        isMenuOpen,
        indexActive,
        activeItemRef,
        inputRef,
        handleInputChange,
        handleOpenMenu,
        handleCloseMenu,
        handleSelectItem,
        handleAddItem
    }
}
