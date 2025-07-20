import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Main } from '../../components/Main';
import { ErrorBoundary } from '../../components/Error-boundary';
import type { StateProps } from '../../types/types';

vi.mock('../../components/TermList', () => ({
  TermList: ({ items }: StateProps) => (
    <ul data-testid="term-list">
      {items.map((item, index) => (
        <li key={index}>
          <span className="term-item__name">{item.name}</span>
          <span className="term-item__desc">{item.url}</span>
        </li>
      ))}
    </ul>
  ),
}));

describe('Main component', () => {
  const mockState = {
    term: 'pikachu',
    items: [
      { name: 'Pikachu', url: 'Electric Pokémon' },
      { name: 'Bulbasaur', url: 'Grass Pokémon' },
    ],
    error: false,
    loading: false,
  };

  it('should correctly receive and render props', () => {
    render(
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Main {...mockState} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Item name/i)).toBeInTheDocument();
    expect(screen.getByText(/Item description/i)).toBeInTheDocument();

    const termList = screen.getByTestId('term-list');
    expect(termList).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Throw an error/i })).toBeInTheDocument();

    expect(screen.queryByText(/Error!/i)).not.toBeInTheDocument();
  });

  it('should throw error and render ErrorBoundary fallback when error prop is true', () => {
    const errorState = {
      ...mockState,
      error: true,
    };

    render(
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Main {...errorState} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Error!/i)).toBeInTheDocument();

    expect(screen.queryByText(/Item name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Item description/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('term-list')).not.toBeInTheDocument();
  });
  it('should throw error and render ErrorBoundary fallback when button is clicked', () => {
    render(
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Main {...mockState} />
      </ErrorBoundary>
    );
    const errorBtn = screen.getByRole('button', { name: /Throw an error/i });
    fireEvent.click(errorBtn);
  
    expect(screen.getByText(/Error!/i)).toBeInTheDocument();
    expect(screen.queryByText(/Item name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Item description/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('term-list')).not.toBeInTheDocument();
  });
});
