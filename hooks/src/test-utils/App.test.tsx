import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from '../App';
import type { StateProps } from '../types/types';
import { fetchAllData, fetchData } from '../api/fetchApi';

vi.mock('../components/Header', () => ({
  Header: ({ sendTerm }: { sendTerm: (term: string) => void }) => (
    <header data-testid="header">
      <div>
        <h1 data-testid="header-title">Find the pokemons you want</h1>
        <div data-testid="header-search">
          <input
            data-testid="search-input"
            placeholder="Search Pokemon by name"
            onChange={(e) => sendTerm(e.target.value)}
          />
          <button
            data-testid="search-button"
            onClick={() => sendTerm('pikachu')}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  ),
}));
vi.mock('../components/Main', () => ({
  Main: ({ items, error }: StateProps, testError: boolean) => {
    if (error || testError) {
      return <div data-testid="error">Error</div>;
    }
    return (
      <main data-testid="main">
        <div data-testid="container">
          <h2 data-testid="list-title">
            <span data-testid="title">Item name</span>
            <span data-testid="title">Item description</span>
          </h2>
          <ul data-testid="term-list">
            {items.map((item, index) => (
              <li key={index} data-testid="term-item">
                <span>{item.name}</span>
                <span>{item.url}</span>
              </li>
            ))}
          </ul>
          <button
            data-testid="error-btn"
            onClick={() => {
              throw new Error('Manual error');
            }}
          >
            Throw an error
          </button>
        </div>
      </main>
    );
  },
}));

vi.mock('../api/fetchApi', () => {
  const mockDataList = [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur' },
  ];
  const mockSingleData = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
  };
  return {
    fetchAllData: vi
      .fn()
      .mockImplementation(
        () =>
          new Promise((resolve) => setTimeout(() => resolve(mockDataList), 100))
      ),
    fetchData: vi.fn().mockResolvedValue(mockSingleData),
  };
});

beforeEach(() => {});

afterEach(() => {
  vi.resetAllMocks();
});

describe('App component', () => {
  it('should make initial API call on component mount', async () => {
    render(<App />);
    expect(fetchAllData).toHaveBeenCalled();
    await vi.waitFor(() => {
      expect(screen.getByTestId('main')).toBeInTheDocument();
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  it('should render the list items on clicking search button ', async () => {
    render(<App />);
    const btn = screen.getByTestId('search-button');
    fireEvent.click(btn);
    expect(fetchData).toHaveBeenCalled();
    expect(screen.findByTestId('term-item')).toBeDefined();
  });
});
