import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

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
  Pagination: ({ setPage }: { setPage: (page: number) => void }) => (
    <button onClick={() => setPage(2)} data-testid="pagination-btn">
      Next
    </button>
  ),
}));

// Mock API + Hook
vi.mock('../api/fetchApi', () => ({
  fetchAllData: vi.fn(),
  fetchData: vi.fn(),
}));

vi.mock('../custom-hooks/useUrlPage', () => ({
  useUrlPage: () => ({
    currentPage: 1,
    setPage: vi.fn(),
  }),
}));

import { fetchAllData, fetchData } from '../api/fetchApi';
import { HomePage } from '../pages/HomePage';
import type { TermListType } from '../types/types';

describe('<HomePage />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title and search input', () => {
    render(<HomePage />);
    expect(screen.getByText(/explore pokemons/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('shows loading spinner while fetching data', async () => {
    (fetchAllData as vi.Mock).mockImplementation(() => new Promise(() => {})); // never resolves

    render(<HomePage />);
    expect(await screen.findByTestId('spinner')).toBeInTheDocument();
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
