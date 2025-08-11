import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HomePage } from '../pages/HomePage';
import type { TermListType } from '../types/types';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetAllTermsQuery,
  useGetTermByNameQuery,
} from '../store/features/termsApi';
import { useUrlPage } from '../custom-hooks/useUrlPage';
import { decrement, increment } from '../store/features/counterPages';
import { skipToken } from '@reduxjs/toolkit/query';

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
  useUrlPage: vi.fn(),
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
  let mockDispatch: ReturnType<typeof vi.fn>;
  let mockSetPage: ReturnType<typeof vi.fn>;
  let mockState: { counter: { count: number } };

  const createAllTermsMock = (overrides?: Partial<ReturnType<typeof useGetAllTermsQuery>>) => ({
    data: undefined,
    isError: false,
    isLoading: false,
    ...overrides,
  });
  const createSingleTermMock = (overrides?: Partial<ReturnType<typeof useGetTermByNameQuery>>) => ({
    data: undefined,
    isError: false,
    isLoading: false,
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockSetPage = vi.fn();
    (useUrlPage as unknown as typeof vi.fn).mockReturnValue({
      currentPage: 1,
      setPage: mockSetPage,
    });

    mockState = { counter: { count: 1 } };
    (useSelector as unknown as typeof vi.fn).mockImplementation((selectorFn) =>
      selectorFn(mockState)
    );

    mockDispatch = vi.fn((action) => {
      if (action.type === increment.type) {
        mockState.counter.count += 1;
      } else if (action.type === decrement.type) {
        mockState.counter.count -= 1;
      }
    });
    (useDispatch as unknown as typeof vi.fn).mockReturnValue(mockDispatch);
  });
   
  it('renders title and search input', () => {
   (useGetAllTermsQuery as unknown as typeof vi.fn).mockReturnValue(
      createAllTermsMock({ data: { results: [], pagesTotal: 0 } })
    );
    (useGetTermByNameQuery as unknown as typeof vi.fn).mockReturnValue(createSingleTermMock());
    render(<HomePage />);
    expect(screen.getByText(/explore pokemons/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('shows loading spinner while fetching data', async () => {
    (useGetAllTermsQuery as unknown as typeof vi.fn).mockReturnValue(
      createAllTermsMock({ isLoading: true })
    );
    (useGetTermByNameQuery as unknown as typeof vi.fn).mockReturnValue(createSingleTermMock());

    render(<HomePage />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders Main and Pagination after successful fetchAllData', async () => {
    (useGetAllTermsQuery as unknown as typeof vi.fn).mockReturnValue(
      createAllTermsMock({
        data: { results: [{ name: 'pikachu', url: '' }], pagesTotal: 5 },
      })
    );
    (useGetTermByNameQuery as unknown as typeof vi.fn).mockReturnValue(createSingleTermMock());

    render(<HomePage />);
    expect(await screen.findByTestId('main-list')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-next')).toBeInTheDocument();
  });

  it('fetches specific item with fetchData when searching', async () => {
   (useGetAllTermsQuery as unknown as typeof vi.fn).mockReturnValue(
      createAllTermsMock({ data: { results: [], pagesTotal: 0 } })
    );
    (useGetTermByNameQuery as unknown as typeof vi.fn).mockImplementation((queryArg) => {
      if (queryArg === skipToken) {
        return createSingleTermMock();
      } else {
        return createSingleTermMock({
          data: { name: queryArg as string, url: 'some-url' },
        });
      }
    });

    render(<HomePage />);
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'bulbasaur' },
    });

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

it('handles pagination button click', async () => {
    (useGetAllTermsQuery as unknown as vi.Mock).mockReturnValue(
      createAllTermsMock({
        data: { results: [{ name: 'charmander', url: '' }], pagesTotal: 5 },
      })
    );
    (useGetTermByNameQuery as unknown as vi.Mock).mockReturnValue(createSingleTermMock());

    const { rerender } = render(<HomePage />);
    const btn = screen.getByTestId('pagination-next');
    fireEvent.click(btn);

    rerender(<HomePage />);

    expect(useGetAllTermsQuery).toHaveBeenCalledWith(2);
    expect(mockDispatch).toHaveBeenCalledWith(increment());
    expect(mockSetPage).toHaveBeenCalledWith(2);
  });
});
