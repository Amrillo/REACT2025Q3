import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Main } from '../../components/Main';
import { ErrorBoundary } from '../../components/Error-boundary';


vi.mock('../../components/TermList', () => ({
  TermList: ({ items }) => (
    <div data-testid="term-list">
      {items.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
    </div>
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

    // Verify that the main titles are rendered
    expect(screen.getByText(/Item name/i)).toBeInTheDocument();
    expect(screen.getByText(/Item description/i)).toBeInTheDocument();

    // Verify that the TermList component receives and renders the items prop
    const termList = screen.getByTestId('term-list');
    expect(termList).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();

    // Verify that the error button is rendered
    expect(screen.getByRole('button', { name: /Throw an error/i })).toBeInTheDocument();

    // Verify that the ErrorBoundary fallback is not rendered when error is false
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

    // Verify that the ErrorBoundary fallback is rendered
    expect(screen.getByText(/Error!/i)).toBeInTheDocument();

    // Verify that the main content is not rendered
    expect(screen.queryByText(/Item name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Item description/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('term-list')).not.toBeInTheDocument();
  });
});