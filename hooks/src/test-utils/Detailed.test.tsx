import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as routerHooks from 'react-router';
import type { PokemonDetailType } from '../types/types';
import { MemoryRouter } from 'react-router';
import { DetailedItem } from '../components/Detailed-item';
import { useGetTermByIdQuery } from '../store/features/termsApi';

// Mock the Button component
vi.mock('../ui/Button', () => ({
  Button: ({
    closeIcon,
    classname,
    onCloseItem,
  }: {
    closeIcon: string;
    classname: string;
    onCloseItem?: () => void;
  }) => (
    <button
      className={classname}
      onClick={onCloseItem}
      data-testid="close-button"
    >
      <img src={closeIcon} alt="close icon" />
    </button>
  ),
}));

// Mock React Router hooks
vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});
vi.mock('../store/features/termsApi', () => ({
  useGetTermByIdQuery: vi.fn(),
}));

const createQueryMock = (
  overrides?: Partial<ReturnType<typeof useGetTermByIdQuery>>
) =>
  ({
    data: undefined,
    isError: false,
    isLoading: false,
    isSuccess: false,
    isFetching: false,
    refetch: vi.fn(),
    ...overrides,
  }) as unknown as ReturnType<typeof useGetTermByIdQuery>;

describe('DetailedItem Component', () => {
  const mockNavigate = vi.fn();
  const mockData: PokemonDetailType = {
    name: 'Pikachu',
    imgSrc: 'https://pokeapi.co/sprites/pikachu.png',
    weight: 60,
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.mocked(routerHooks.useParams).mockReturnValue({
      id: '123',
      page: 'pokemon',
    });
    vi.mocked(routerHooks.useNavigate).mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  it('renders correctly with valid query data', () => {
    (useGetTermByIdQuery as jest.Mock).mockReturnValue(
      createQueryMock({ data: mockData })
    );
    render(
      <MemoryRouter>
        <DetailedItem />
      </MemoryRouter>
    );

    // Verify container

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Pokemon has a weight of 60')).toBeInTheDocument();
  });

  it('renders no data message when query returns undefined', () => {
    (useGetTermByIdQuery as jest.Mock).mockReturnValue(
      createQueryMock({ data: undefined })
    );

    render(
      <MemoryRouter>
        <DetailedItem />
      </MemoryRouter>
    );
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('renders no data message when query errors', () => {
    (useGetTermByIdQuery as jest.Mock).mockReturnValue(
      createQueryMock({ data: undefined, isError: true })
    );

    render(
      <MemoryRouter>
        <DetailedItem />
      </MemoryRouter>
    );
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('navigates to correct page when close button is clicked', () => {
    (useGetTermByIdQuery as jest.Mock).mockReturnValue(
      createQueryMock({ data: mockData })
    );

    render(
      <MemoryRouter>
        <DetailedItem />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /close icon/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon');
  });
});
