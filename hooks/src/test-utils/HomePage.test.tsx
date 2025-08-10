import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HomePage } from '../pages/HomePage';
import type { FetchAllDataResponse, TermListType } from '../types/types';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetAllTermsQuery,
  useGetTermByNameQuery,
} from '../store/features/termsApi';
// Mock components
vi.mock('../components/ui/SearchPanel', () => ({
  SearchPanel: ({ sendTerm }: { sendTerm: (val: string) => void }) => (
    <input
      placeholder="Search"
      onChange={(e) => sendTerm(e.target.value)}
      data-testid="search-input"
    />
  ),
}));

vi.mock('../components/Main', () => ({
  Main: ({ items }: { items: TermListType[] }) => (
    <ul data-testid="main-list">
      {items.map((item) => (
        <li key={item.name}>{item.name}</li>
      ))}
    </ul>
  ),
}));

vi.mock('../components/Pagination', () => ({
  Pagination: ({
    setPageChange,
  }: {
    setPageChange: (dir: 'prev' | 'next') => void;
  }) => (
    <>
      <button
        onClick={() => setPageChange('prev')}
        data-testid="pagination-prev"
      >
        Prev
      </button>
      <button
        onClick={() => setPageChange('next')}
        data-testid="pagination-next"
      >
        Next
      </button>
    </>
  ),
}));

vi.mock('../custom-hooks/useUrlPage', () => ({
  useUrlPage: () => ({
    currentPage: 1,
    setPage: vi.fn(),
  }),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../store/features/termsApi', () => ({
  useGetAllTermsQuery: vi.fn(),
  useGetTermByNameQuery: vi.fn(),
}));


describe('<HomePage />', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as vi.Mock).mockReturnValue(mockDispatch);
    (useSelector as vi.Mock).mockImplementation((selectorFn) =>
      selectorFn({ counter: { count: 1 } })
    );
  });
   const createAllTermsMock = (overrides?: FetchAllDataResponse) => ({
    data: undefined,
    isError: false,
    isLoading: false,
    ...overrides,
  });

  const createSingleTermMock = (overrides?: TermListType) => ({
    data: undefined,
    isError: false,
    isLoading: false,
    ...overrides,
  });
  it('renders title and search input', () => {
    (useGetAllTermsQuery as vi.Mock).mockReturnValue(
      createAllTermsMock({ data: { results: [], pagesTotal: 0 } })
    );
    (useGetTermByNameQuery as vi.Mock).mockReturnValue(createSingleTermMock());
    render(<HomePage />);
    expect(screen.getByText(/explore pokemons/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('shows loading spinner while fetching data', async () => {
    (useGetAllTermsQuery as vi.Mock).mockReturnValue(
      createAllTermsMock({ isLoading: true })
    );
    (useGetTermByNameQuery as vi.Mock).mockReturnValue(createSingleTermMock());

    render(<HomePage />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders Main and Pagination after successful fetchAllData', async () => {
    (fetchAllData as vi.Mock).mockResolvedValue({
      results: [{ name: 'pikachu' }],
      pagesTotal: 5,
    });

    render(<HomePage />);
    expect(await screen.findByTestId('main-list')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-btn')).toBeInTheDocument();
  });

  it('fetches specific item with fetchData when searching', async () => {
    (fetchData as vi.Mock).mockResolvedValue({ name: 'bulbasaur' });

    render(<HomePage />);
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'bulbasaur' },
    });

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  it('handles pagination button click', async () => {
    (fetchAllData as vi.Mock).mockResolvedValue({
      results: [{ name: 'charmander' }],
      pagesTotal: 5,
    });

    render(<HomePage />);
    const btn = await screen.findByTestId('pagination-btn');
    fireEvent.click(btn);

    // Pagination button sets page to 2 → triggers re-render
    expect(fetchAllData).toHaveBeenCalledWith(2);
  });
});
