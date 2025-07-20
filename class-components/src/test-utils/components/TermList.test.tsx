import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { TermList } from '../../components/TermList';

describe('TermList rendering', () => {
  it('Renders correct number of items when data is provided', () => {
    const mockItems = [
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
      },
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur',
      },
    ];
    render(<TermList items={mockItems} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockItems.length);
  });

  it('Renders no items when empty array is provided', () => {
    render(<TermList items={[]} />);
    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0);
  });

  it('Renders one item when single data is provided', () => {
    const mockItems = [
      {
        name: 'charmander',
        url: 'https://pokeapi.co/api/v2/pokemon/charmander',
      },
    ];
    render(<TermList items={mockItems} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(
      screen.getByText('https://pokeapi.co/api/v2/pokemon/charmander')
    ).toBeInTheDocument();
  });

  it('Renders item content correctly', () => {
    const mockItems = [
      {
        name: 'eevee',
        url: 'https://pokeapi.co/api/v2/pokemon/eevee',
      },
    ];
    render(<TermList items={mockItems} />);
    const nameElem = screen.getByText('eevee');
    const urlElem = screen.getByText('https://pokeapi.co/api/v2/pokemon/eevee');
    expect(nameElem).toBeInTheDocument();
    expect(urlElem).toBeInTheDocument();
  });
});
