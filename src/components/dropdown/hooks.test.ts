import { renderHook, act } from '@testing-library/react';
import { useDropdown } from './hooks';
describe('useDropdown', () => {
    test('should initialize with the correct initial state', () => {
        const { result } = renderHook(() =>
            useDropdown({
                items: ['Item 1', 'Item 2', 'Item 3'],
                onSelect: jest.fn(),
                value: 'Item 2',
            })
        );

        expect(result.current.inputValue).toBe('Item 2');
        expect(result.current.options.size).toBe(3);
        expect(result.current.isMenuOpen).toBe(false);
        expect(result.current.indexActive).toBe(-1);
    });

    test('should update input value and open menu on input change', () => {
        const { result } = renderHook(() =>
            useDropdown({
                items: ['Item 1', 'Item 2', 'Item 3'],
                onSelect: jest.fn(),
            })
        );

        act(() => {
            const event = {
                target: { value: 'New Value' },
                currentTarget: { value: 'New Value' },
                preventDefault: () => {},
            };

            result.current.handleInputChange(event as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.inputValue).toBe('New Value');
        expect(result.current.isMenuOpen).toBe(true);
    });

    test('should select item and call onSelect function', () => {
        const onSelectMock = jest.fn();
        const { result } = renderHook(() =>
            useDropdown({
                items: ['Item 1', 'Item 2', 'Item 3'],
                onSelect: onSelectMock,
            })
        );

        act(() => {
            result.current.handleSelectItem('Item 2', 1);
        });

        expect(result.current.inputValue).toBe('Item 2');
        expect(result.current.indexActive).toBe(1);
        expect(onSelectMock).toHaveBeenCalledWith('Item 2');
    });

    test('should handle item addition', () => {
      const items = ['Option 1', 'Option 2', 'Option 3'];
        const onSelect = jest.fn();
        const { result } = renderHook(() => useDropdown({ items, onSelect }));

        act(() => {
            const event = {
                target: { value: 'New Option' },
                currentTarget: { value: 'New Option' },
                preventDefault: () => {},
            };
            result.current.handleInputChange(event as React.ChangeEvent<HTMLInputElement>);
        });

        act(() => {
            result.current.handleAddItem();
        });

        expect(result.current.inputValue).toBe('');
        expect(result.current.indexActive).toBe(0);
        expect(onSelect).toHaveBeenCalledWith('New Option');
        expect(result.current.options.has('New Option')).toBe(true);
    });

});
