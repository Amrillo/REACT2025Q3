import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { Flyout } from '../../components/ui/Flyout';
import * as downloadUtil from '../../utils/downloadCsv';

vi.mock('../../utils/downloadCsv', () => ({
  downloadCsv: vi.fn(),
}));

describe('Flyout component', () => {
    const mockUnselectAll = vi.fn();  
    const mockSelectedItems = [  
        {  
            id: '2',
            name: 'pikachu',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
            checked: true,
        },
        {  
            id: '3',
            name: 'metapod',
            url: 'https://pokeapi.co/api/v2/pokemon/3/',
            checked: false,
        },
        {  
            id: '6',
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/6/',
            checked: true,
        }
    ]
    it('renders correctly with props and triggers events', () => {
        render(
            <Flyout
                countSelected={2}
                unSelectAll={mockUnselectAll}
                selectedItems={mockSelectedItems}
            />
        );
        const headerText = screen.getByText(/2 items selected/i);
        const unselectBtn = screen.getByRole('button', { name: /unselect all/i });
        const downLoadBtn = screen.getByRole('button', { name: /download/i });

        expect(headerText).toBeInTheDocument();
        expect(unselectBtn).toBeInTheDocument();
        expect(downLoadBtn).toBeInTheDocument();
        fireEvent.click(unselectBtn);

        expect(mockUnselectAll).toHaveBeenCalled();
    });
    it('calls downloadCsv with only checked items when Download button is clicked', () => {
        const downloadSpy = vi.spyOn(downloadUtil, 'downloadCsv');

        render(
        <Flyout
            countSelected={2}
            unSelectAll={mockUnselectAll}
            selectedItems={mockSelectedItems}
        />
        );

        const downloadBtn = screen.getByRole('button', { name: /download/i });
        expect(downloadBtn).toBeInTheDocument();

        fireEvent.click(downloadBtn);

        expect(downloadSpy).toHaveBeenCalledWith([
        {
            id: '2',
            name: 'pikachu',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
            checked: true,
        },
        {
            id: '6',
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/6/',
            checked: true,
        },
        ]);
    });
});
