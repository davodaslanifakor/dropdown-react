import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import useStyle from "./useStyle";

type Item = string

interface Props {
    items: string[],
    onSelect: (item: Item) => void
    value?: string
}

const Dropdown = ({items, onSelect, value}: Props) => {
    const styles = useStyle();
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
      setTimeout(()=>{
          setMenuOpen(false);
      },168)
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
            setMenuOpen(false);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setIndexActive((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setIndexActive((prev) => (prev < options.size - 1 ? prev + 1 : prev));
        } else if (event.key === 'Enter') {
            event.preventDefault();
            handleAddItem();
        }
    };

    useEffect(() => {
        const handleGlobalKeyDown: EventListener = (event) => {
            const keyboardEvent = event as unknown as KeyboardEvent;
            if (keyboardEvent.key === 'Escape') {
                keyboardEvent.preventDefault();
                inputRef.current?.blur();
                handleCloseMenu()
                if (indexActive === -1) {
                    setValue('')
                    if (onSelect) {
                        onSelect('')
                    }
                }
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);

        return () => {
            document.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, []);

    useEffect(() => {
        if (activeItemRef.current) {
            activeItemRef.current.scrollIntoView({
                block: 'center',
            });
        }
    }, [indexActive]);
    /*useEffect(() => {
        if (isMenuOpen && inputRef.current) {
            inputRef.current.focus();
        } else {
            inputRef.current?.blur();
        }
    }, [isMenuOpen]);*/

    return (
        <>
            <div className={styles.parent} >
                 <input
                    ref={inputRef}
                    placeholder={'Add New One'}
                    value={inputValue}
                    onChange={handleInputChange}
                    className={styles.input}
                    type="text"
                    onKeyDown={handleKeyDown}
                    onFocus={handleOpenMenu} // Open menu on input focus
                    onBlur={handleCloseMenu}// Close menu on input blur
                />
                <ul className={styles.list}>
                    {isMenuOpen && Array.from(options).map((item, index) => {
                        return (
                            <li
                                ref={indexActive === index ? activeItemRef : null}
                                className={`${styles.listItem} ${indexActive === index ? styles.activeItem : ''}`}
                                key={index} onClick={() => handleSelectItem(item, index)}>
                                <span className={styles.listItemText}>{item}</span>
                                <i className={styles.listItemIcon}>&#10003;</i>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
};

export default Dropdown;
