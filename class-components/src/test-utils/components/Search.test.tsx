import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchPanel from '../../components/ui/Search';

describe('SearchPanel', () => { 
    const mockSendTerm = vi.fn();

    beforeEach(() => {  
       localStorage.setItem('searchTerm', 'bulbasaur');  
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('renders search input', () => {
        render(<SearchPanel sendTerm={mockSendTerm} />);
        const inputElem = screen.getByPlaceholderText(/search pokemon by name/i);
        expect(inputElem).toBeInTheDocument();
    });

    it('renders search button', () => {
        render(<SearchPanel sendTerm={mockSendTerm} />);
        const searchBtn = screen.getByRole('button', { name: /search button/i });
        expect(searchBtn).toBeInTheDocument();
     });
    
    it('Displays previously saved search term from localStorage on mount', () => { 
         localStorage.setItem('searchTerm', 'bulbasaur');
         render(<SearchPanel sendTerm={mockSendTerm} />);
         const input = screen.getByPlaceholderText(/search pokemon by name/i);
         expect(input).toHaveValue('bulbasaur');
        
        const closeButton = screen.getByRole('button', { name: /close icon/i });
        expect(closeButton).toBeInTheDocument();
    })
    it('Shows empty input when no saved term exists', () => {  
        localStorage.removeItem('searchTerm');
        render(<SearchPanel sendTerm={mockSendTerm} />);
        const input = screen.getByPlaceholderText(/search pokemon by name/i);
        expect(input).toHaveValue('');
    })
    it('Updates input value when user types', () => {  

        render(<SearchPanel sendTerm={mockSendTerm} />);
         const inputElement = screen.getByPlaceholderText(/search pokemon by name/i);
        fireEvent.change(inputElement, { target: { value: 'charmander' } });  
    })
    it('Saves search term to localStorage when search button is clicked', () => {   
        render(<SearchPanel sendTerm={mockSendTerm} />);
        const searchBtn = screen.getByRole('button', { name: /search button/i });
        fireEvent.click(searchBtn);
        expect(localStorage.getItem('searchTerm')).toBe('bulbasaur');
    })

     it('Trims whitespace from search input before saving', () => {   
        render(<SearchPanel sendTerm={mockSendTerm} />);
        const inputElement = screen.getByPlaceholderText(/search pokemon by name/i);
        
    })
})  



