import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import useStyle from "./useStyle";

const optionsProps = [
    "Hello 👋",
    "I'm Aline 👽",
    "I live in 🌌",
    "I drive a 🚀"
]
const Dropdown = () => {
    const styles = useStyle()
    const [options, setOptions] = useState(new Set(optionsProps));
    const [inputValue,setValue] = useState('')
    const [indexActive,setIndexActive] = useState(-1)
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const activeItemRef = useRef<HTMLLIElement | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue)
        setIndexActive(-1)
    };

    const handleSelectItem = (item:string,index:number) =>{
        setValue(item)
        setIndexActive(index)
    }
    const handleAddItem = () => {
        if (indexActive !== -1) {
            const activeItem = Array.from(options)[indexActive];
            setValue(activeItem);
        } else if (inputValue.trim() !== '') {
            if (options.has(inputValue)) {
                return; // Ignore adding duplicate value
            }
            setOptions((prev) => new Set([inputValue, ...Array.from(prev)]));
            setIndexActive(0);
            setValue('');
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

    const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIndexActive(-1);
        }
    };

    useEffect(() => {
        const handleGlobalKeyDown: EventListener = (event) => {
            const keyboardEvent = event as unknown as KeyboardEvent;
            if (keyboardEvent.key === 'Escape') {
                keyboardEvent.preventDefault();
                dropdownRef.current?.blur();
            }
        };

        const handleGlobalClick: EventListener = (event) => {
            handleOutsideClick(event as MouseEvent);
        };

        document.addEventListener('keydown', handleGlobalKeyDown);
        document.addEventListener('click', handleGlobalClick);

        return () => {
            document.removeEventListener('keydown', handleGlobalKeyDown);
            document.removeEventListener('click', handleGlobalClick);
        };
    }, []);
    useEffect(() => {
        if (activeItemRef.current) {
            activeItemRef.current.scrollIntoView({
                block: "center",
            });
        }
    }, [indexActive]);
    return (
        <>
            <div className={styles.parent} >
                <input
                    placeholder={'Add New One'}
                    value={inputValue}
                    onChange={handleInputChange}
                    className={styles.input}
                    type="text"
                    onKeyDown={handleKeyDown}
                />
                <ul className={styles.list}  >
                    {Array.from(options).map((item, index) => {
                        return (
                            <li
                                ref={indexActive === index ? activeItemRef : null}
                                className={`${styles.listItem} ${indexActive === index ? styles.activeItem : ''}`}
                                key={index} onClick={()=>handleSelectItem(item,index)}>
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
