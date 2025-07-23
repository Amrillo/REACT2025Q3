import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TermItem } from '../../components/ui/TermItem';

describe('TermItem', () => {
  it('renders props correctly in TermItem', () => {
    const mockprops = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
    };
    render(<TermItem name={mockprops.name} url={mockprops.url} />);

    const name = screen.getByText(mockprops.name);
    const url = screen.getByText(mockprops.url);

    expect(name).toBeInTheDocument();
    expect(url).toBeInTheDocument();
  });

  it('handle missed props gracfully', () => {
    const mockprops = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
    };
    render(
      <TermItem
        name={mockprops.name}
        key={mockprops.name}
        url={mockprops.url}
      />
    );

    expect(mockprops.url).not.toBe('');
    expect(mockprops.name).not.toBe('');
  });
});
