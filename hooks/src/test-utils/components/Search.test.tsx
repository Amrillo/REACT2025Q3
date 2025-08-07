import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchPanel } from '../../components/ui/SearchPanel';
import * as useLocalStorageSearchHook from '../../custom-hooks/useLocalStorage';
import { MemoryRouter } from 'react-router';

vi.mock('../../custom-hooks/useLocalStorage', () => ({
  useLocalStorageSearch: vi.fn(),
}));

describe('SearchPanel', () => {
  const mockSendTerm = vi.fn();
  let mockSetSearchTerm: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSetSearchTerm = vi.fn();
    vi.mocked(useLocalStorageSearchHook.useLocalStorageSearch).mockReturnValue([
      '',
      mockSetSearchTerm,
    ]);
    mockSendTerm.mockClear();
  });

  it('renders search input with correct attributes', () => {
    render(
      <MemoryRouter>
        <SearchPanel sendTerm={mockSendTerm} />
      </MemoryRouter>
    );
    const inputElem = screen.getByPlaceholderText(/search pokemon by name/i);
    expect(inputElem).toBeInTheDocument();
    expect(inputElem).toHaveAttribute('type', 'text');
    expect(inputElem).toHaveClass('search-input');
    expect(inputElem).toHaveValue('');
  });

  it('displays previously saved search term from localStorage on mount', () => {
    vi.mocked(useLocalStorageSearchHook.useLocalStorageSearch).mockReturnValue([
      'bulbasaur',
      mockSetSearchTerm,
    ]);

    render(
      <MemoryRouter>
        <SearchPanel sendTerm={mockSendTerm} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    expect(input).toHaveValue('bulbasaur');
    expect(
      screen.queryByRole('button', { name: /close icon/i })
    ).not.toBeInTheDocument();
  });
  it('should call setSearchTerm and show close button when user types', () => {
    render(
      <MemoryRouter>
        <SearchPanel sendTerm={mockSendTerm} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      /search pokemon by name/i
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'bulbasaur' } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith('bulbasaur');
    const closeButton = screen.queryByRole('button', { name: /close icon/i });
    expect(closeButton).toBeInTheDocument();
  });
  it('calls sendTerm when input is valid lowercase', () => {
    vi.mocked(useLocalStorageSearchHook.useLocalStorageSearch).mockReturnValue([
      'bulbasaur',
      mockSetSearchTerm,
    ]);

    render(
      <MemoryRouter>
        <SearchPanel sendTerm={mockSendTerm} />
      </MemoryRouter>
    );

    const searchButton = screen.getByRole('button', {
      name: /search button/i,
    });

    fireEvent.click(searchButton);
    expect(mockSendTerm).toHaveBeenCalledWith('bulbasaur');
    expect(screen.queryByText(/no capital letters/i)).not.toBeInTheDocument();
  });
  it('does NOT call sendTerm and shows error when input is invalid', () => {
    vi.mocked(useLocalStorageSearchHook.useLocalStorageSearch).mockReturnValue([
      'BulbaSaur123',
      mockSetSearchTerm,
    ]);

    render(
      <MemoryRouter>
        <SearchPanel sendTerm={mockSendTerm} />
      </MemoryRouter>
    );

    const searchButton = screen.getByRole('button', {
      name: /search button/i,
    });

    fireEvent.click(searchButton);
    expect(mockSendTerm).not.toHaveBeenCalled();
    expect(
      screen.getByText(
        /no capital letters , characters and empty spaces are allowed/i
      )
    ).toBeInTheDocument();
  });
});
