import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Main } from '../../components/Main';
import { ErrorBoundary } from '../../components/Error-boundary';
import type { StateProps, TermListType } from '../../types/types';
import { MemoryRouter } from 'react-router';

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
  const mockState: { items: TermListType[]; error: boolean } = {
    items: [
      { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ],
    error: false,
  };
  it('should correctly receive and render props', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary fallback={<div>Error!</div>}>
          <Main {...mockState} />
        </ErrorBoundary>
      </MemoryRouter>
    );

    const section = screen.getByRole('region', { name: /pokemons/i });
    expect(section).toHaveClass('pokemons');
    expect(section.querySelector('.pokemons-galery')).toBeInTheDocument();

    const termList = screen.getByTestId('term-list');
    expect(termList).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toHaveClass('term-item__name');
    expect(screen.getByText('Bulbasaur')).toHaveClass('term-item__name');
    expect(
      screen.getByText('https://pokeapi.co/api/v2/pokemon/25/')
    ).toHaveClass('term-item__desc');
    expect(
      screen.getByText('https://pokeapi.co/api/v2/pokemon/1/')
    ).toHaveClass('term-item__desc');

    expect(
      screen.getByRole('button', { name: /Throw an error/i })
    ).toBeInTheDocument();

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
