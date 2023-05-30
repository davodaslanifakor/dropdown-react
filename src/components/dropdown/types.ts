import {ChangeEvent, MutableRefObject} from "react";

type Item = string

export interface Props {
    items: string[],
    onSelect: (item: Item) => void
    value?: string
}

export interface Params {
    items: string[],
    onSelect: (item: Item) => void
    value?: string
}
export interface DropdownOutput {
    inputValue: string;
    options: Set<string>;
    isMenuOpen: boolean;
    indexActive: number;
    activeItemRef: MutableRefObject<HTMLLIElement | null>;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleOpenMenu: () => void;
    handleCloseMenu: () => void;
    handleSelectItem: (item: string, index: number) => void;
}
