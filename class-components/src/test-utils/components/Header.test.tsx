import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';

describe('Header', () => {
  const mockSendTerm = vi.fn();

  it('it should have correct props', () => {
    render(<Header sendTerm={mockSendTerm} />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    expect(typeof mockSendTerm).toBe('function');
  });

  it('it should render header title and should have a text', () => {
    render(<Header sendTerm={mockSendTerm} />);
    const heading = screen.getByRole('heading', {
      name: /Find the pokemons you want/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Find the pokemons you want');
  });
  it('should call sendTerm when SearchPanel triggers a search', () => {
    render(<Header sendTerm={mockSendTerm} />);
    const inputElem = screen.getByPlaceholderText(/search pokemon by name/i);
    const searchBtn = screen.getByRole('button', { name: /search button/i });

    fireEvent.change(inputElem, { target: { value: 'pikachu' } });
    fireEvent.click(searchBtn);
    expect(mockSendTerm).toHaveBeenCalledWith('pikachu');
  });
});
