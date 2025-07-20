import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from '../App';
import type { StateProps } from '../types/types';
import { fetchAllData} from '../api/fetchApi';

// Mock Header component
vi.mock('../components/Header', () => ({
  Header: ({ sendTerm }: { sendTerm: (term: string) => void }) => (
    <header data-testid="header">
      <input
        data-testid="search-input"
        placeholder="Search Pokemon by name"
        onChange={(e) => sendTerm(e.target.value)}
      />
      <button data-testid="search-button" onClick={() => sendTerm('pikachu')}>
        Search
      </button>
    </header>
  ),
}));
vi.mock('../components/Main', () => ({
  Main: ({ term, items, error }: StateProps) => {
    if (error) {
      return <div data-testid="error">Error</div>;
    }
    return (
      <main data-testid="main">
        <ul data-testid="term-list">
          {items.map((item, index) => (
            <li key={index} data-testid="term-item">
              <span>{item.name}</span>
              <span>{item.url}</span>
            </li>
          ))}
        </ul>
        <button data-testid="error-btn" onClick={() => { throw new Error('Manual error'); }}>
          Throw an error
        </button>
      </main>
    );
  }
}));
// Mock fetchApi functions
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
   fetchAllData: vi.fn().mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve(mockDataList), 100))
    ),
    fetchData: vi.fn().mockResolvedValue(mockSingleData),
  };
});

// Mock localStorage
beforeEach(() => {
  //  vi.useFakeTimers();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('App component', () => {
  // Integration Tests
  it('should make initial API call on component mount', async () => {
    render(<App />);
    expect(fetchAllData).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByTestId('main')).toBeInTheDocument();
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });
});