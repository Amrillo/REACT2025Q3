import { createMemoryRouter, RouterProvider } from 'react-router';
import { router as appRouter } from '../routes/Router';
import { render, screen, waitFor } from '@testing-library/react';
import { fetchItem } from '../api/fetchApi';

vi.mock('../api/fetchApi', () => ({
  fetchItem: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('App Router', () => {
  it('renders HomePage at "/"', async () => {
    const memoryRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={memoryRouter} />);
    expect(await screen.findByText(/explore pokemons/i)).toBeInTheDocument();
  });

  it('renders Aboutpage at "/about"', async () => {
    const memoryRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/about'],
    });
    render(<RouterProvider router={memoryRouter} />);
    expect(await screen.findByRole('heading')).toBeInTheDocument();
  });
  it('renders NonFoundPage at unknown route', async () => {
    const memoryRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/*'],
    });
    render(<RouterProvider router={memoryRouter} />);
    const title = screen.findByRole('heading');
    expect(await title).toBeInTheDocument();
  });
  it('renders DetailedItem via loader at /page/details/:id', async () => {
    (fetchItem as vi.Mock).mockResolvedValue({
      name: 'bulbasaur',
      imgSrc: '/bulbasaur.png',
      weight: 69,
    });
    const memoryRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/pokemon/details/1'],
    });
    render(<RouterProvider router={memoryRouter} />);
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });
});
