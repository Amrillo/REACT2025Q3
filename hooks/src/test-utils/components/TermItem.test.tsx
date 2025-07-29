import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TermItem } from '../../components/ui/TermItem';
import { MemoryRouter } from 'react-router';

vi.mock('../../custom-hooks/useUrlPage', () => ({
  useUrlPage: () => ({ currentPage: 'pokemon' }),
}));

describe('TermItem', () => {
  it('renders props correctly in TermItem', () => {
    const mockprops = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
    };
    render(
      <MemoryRouter>
        <TermItem name={mockprops.name} url={mockprops.url} />
      </MemoryRouter>
    );

    const name = screen.getByText(mockprops.name);
    const url = screen.getByText(mockprops.url);

    expect(name).toBeInTheDocument();
    expect(url).toBeInTheDocument();
    expect(url).toHaveAttribute('aria-label', 'url name');
  });
});
