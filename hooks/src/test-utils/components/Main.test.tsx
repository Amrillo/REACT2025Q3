import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Main } from '../../components/Main';
import type { StateProps, TermListType } from '../../types/types';
import { MemoryRouter } from 'react-router';

vi.mock('../store/features/getApiSlice', () => ({
  useGetTermByIdQuery: vi.fn(),
}));

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
  const mockState: { items: TermListType[] } = {
    items: [
      { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ],
  };

  it('should correctly receive and render props', () => {
    render(
      <MemoryRouter>
        <Main {...mockState} />
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

    expect(screen.queryByText(/Failed to fetch data/i)).not.toBeInTheDocument();
  });

  it('should render fallback when button is clicked', () => {
    render(
      <MemoryRouter>
        <Main {...mockState} />
      </MemoryRouter>
    );

    const errorBtn = screen.getByRole('button', { name: /Throw an error/i });
    fireEvent.click(errorBtn);

    // Now we expect the inline fallback to be rendered
    expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
    expect(screen.queryByTestId('term-list')).not.toBeInTheDocument();
  });
});
