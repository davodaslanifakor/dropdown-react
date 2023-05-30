import React from 'react';
import useStyle from "./useStyle";
import {useDropdown} from "./hooks";
import {Props} from "./types";

const Dropdown = ({items, onSelect, value}: Props) => {
    const styles = useStyle();
    const {
        inputRef,
        inputValue,
        handleInputChange,
        handleOpenMenu,
        handleCloseMenu,
        isMenuOpen,
        options,
        indexActive,
        activeItemRef,
        handleSelectItem
    } = useDropdown({items, onSelect, value})

    return (
        <>
            <div className={styles.parent}>
                <input
                    ref={inputRef}
                    placeholder={'Add New One'}
                    value={inputValue}
                    onChange={handleInputChange}
                    className={styles.input}
                    type="text"
                    onFocus={handleOpenMenu}
                    onBlur={handleCloseMenu}
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

export default Dropdown
