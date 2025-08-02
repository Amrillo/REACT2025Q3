import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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
    // Reset mocks and set default hook behavior
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
    // Close button should not be present on mount (close state is false initially)
    expect(
      screen.queryByRole('button', { name: /close icon/i })
    ).not.toBeInTheDocument();
  });
});
