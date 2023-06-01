// /src/components/dropdown/dropdown.test.tsx

import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Dropdown from './dropdown';

describe('Dropdown', () => {
    it('renders the dropdown component', () => {
        render(
            <Dropdown items={[]} onSelect={() => {}} value="" />
        );

        const inputElement = screen.getByPlaceholderText('Add New One');
        expect(inputElement).toBeInTheDocument();
    });

    it('calls the onSelect function when an item is selected', () => {
        const onSelectMock = jest.fn();
        const { getByPlaceholderText } = render(
            <Dropdown items={['Item 1', 'Item 2']} onSelect={onSelectMock} value="" />
        );

        const inputElement = getByPlaceholderText('Add New One');
        fireEvent.focus(inputElement);

        const listItem = screen.getByText('Item 1')
        fireEvent.click(listItem);

        expect(onSelectMock).toHaveBeenCalledWith('Item 1');
    });

    it('adds a new item when entered in the input', () => {
        const onSelectMock = jest.fn();
        render(<Dropdown items={['Item 1', 'Item 2']} onSelect={onSelectMock} value="" />);

        const inputElement = screen.getByPlaceholderText('Add New One');
        fireEvent.focus(inputElement);
        fireEvent.change(inputElement, { target: { value: 'New Item' } });
        fireEvent.keyDown(inputElement, { key: 'Enter' });

        expect(onSelectMock).toHaveBeenCalledWith('New Item');
    });
});
