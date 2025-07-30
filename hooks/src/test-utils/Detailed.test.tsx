import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as routerHooks from 'react-router';
import type { PokemonDetailType } from '../types/types';
import { MemoryRouter } from 'react-router';
import { DetailedItem } from '../components/Detailed-item';

// Mock the Button component
vi.mock('../ui/Button', () => ({
  Button: ({ closeIcon, classname, onCloseItem }: { closeIcon: string; classname: string; onCloseItem?: () => void }) => (
    <button className={classname} onClick={onCloseItem} data-testid="close-button">
      <img src={closeIcon} alt="close icon" />
    </button>
  ),
}));

// Mock React Router hooks
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: vi.fn(),
    useLoaderData: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe('DetailedItem Component', () => {
  const mockNavigate = vi.fn();
  const mockData: PokemonDetailType = {
    name: 'Pikachu',
    imgSrc: 'https://pokeapi.co/sprites/pikachu.png',
    weight: 60,
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.mocked(routerHooks.useParams).mockReturnValue({ page: 'pokemon' });
    vi.mocked(routerHooks.useLoaderData).mockReturnValue(mockData);
    vi.mocked(routerHooks.useNavigate).mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  it('renders correctly with valid loader data', () => {
    render(
      <MemoryRouter>
        <DetailedItem />
      </MemoryRouter>
    );

    // Verify container
    const container = screen.getByTestId('term-detailed');
    expect(container).toHaveClass('term-detailed');

    // Verify image
    const image = screen.getByAltText('Pikachu');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://pokeapi.co/sprites/pikachu.png');
    expect(image.parentElement).toHaveClass('term-detailed-img');

    // Verify title and description
    expect(screen.getByText('Pikachu')).toHaveClass('term-detailed-title');
    expect(screen.getByText('Pokemon has a weight of 60')).toHaveClass('term-detailed-description');

    // Verify close button
    const closeButton = screen.getByRole('button', { name: /close icon/i });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('term-detailed-close');
  });

  it('renders no data message when loader data is undefined', () => {
    vi.mocked(routerHooks.useLoaderData).mockReturnValue(undefined);

    render(
      <MemoryRouter>
        <DetailedItem />
      </MemoryRouter>
    );
    const container = screen.getByTestId('term-detailed');
    expect(screen.getByText('No data found')).toBeInTheDocument();
    expect(container).toHaveClass('term-detailed');
    expect(screen.queryByAltText('Pikachu')).not.toBeInTheDocument();
    expect(screen.queryByText('Pokemon has a weight of 60')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close icon/i })).not.toBeInTheDocument();
  });

  it('renders no data message when loader data is missing fields', () => {
    vi.mocked(routerHooks.useLoaderData).mockReturnValue({ name: 'Pikachu' });

    render(
      <MemoryRouter>
        <DetailedItem />
      </MemoryRouter>
    );
     const container = screen.getByTestId('term-detailed');
    expect(screen.getByText('No data found')).toBeInTheDocument();
    expect(container).toHaveClass('term-detailed');
    expect(screen.queryByAltText('Pikachu')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close icon/i })).not.toBeInTheDocument();
  });

  it('navigates to correct page when close button is clicked', () => {
    vi.mocked(routerHooks.useParams).mockReturnValue({ page: 'pokemon' });

    render(
      <MemoryRouter>
        <DetailedItem />
      </MemoryRouter>
    );

    const closeButton = screen.getByRole('button', { name: /close icon/i });
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/pokemon');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('applies correct classes and structure', () => {
    render(
      <MemoryRouter>
        <DetailedItem />
      </MemoryRouter>
    );

    const imgContainer = screen.getByAltText('Pikachu').parentElement;
    expect(imgContainer).toHaveClass('term-detailed-img');

    const title = screen.getByText('Pikachu');
    expect(title).toHaveClass('term-detailed-title');
    expect(title.tagName).toBe('H2');

    const description = screen.getByText('Pokemon has a weight of 60');
    expect(description).toHaveClass('term-detailed-description');
    expect(description.tagName).toBe('P');

    const closeButton = screen.getByRole('button', { name: /close icon/i });
    expect(closeButton).toHaveClass('term-detailed-close');
    expect(closeButton.querySelector('img')).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'));
  });
});