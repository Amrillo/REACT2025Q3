import { createMemoryRouter, RouterProvider } from 'react-router';
import { router as appRouter } from '../routes/Router';
import { render, screen, waitFor } from '@testing-library/react';
import {
  useGetAllTermsQuery,
  useGetTermByIdQuery,
  useGetTermByNameQuery,
} from '../store/features/termsApi';
import { Provider } from 'react-redux';
import { store } from '../store/reduxStore';

vi.mock('../store/features/termsApi', () => ({
  termsApi: {
    reducerPath: 'terms',
    reducer: () => ({}),
    middleware: () => (next) => (action) => next(action),
  },
  useGetAllTermsQuery: vi.fn(),
  useGetTermByNameQuery: vi.fn(),
  useGetTermByIdQuery: vi.fn(),
}));

const createAllTermsMock = (overrides = {}) => ({
  data: { results: [], pagesTotal: 0 },
  isError: false,
  isLoading: false,
  ...overrides,
});

const createSingleTermMock = (overrides = {}) => ({
  data: undefined,
  isError: false,
  isLoading: false,
  ...overrides,
});

const createDetailMock = (overrides = {}) => ({
  data: undefined,
  isError: false,
  isLoading: false,
  ...overrides,
});
beforeEach(() => {
  vi.clearAllMocks();
  (useGetAllTermsQuery as vi.Mock).mockReturnValue(createAllTermsMock());
  (useGetTermByNameQuery as vi.Mock).mockReturnValue(createSingleTermMock());
  (useGetTermByIdQuery as vi.Mock).mockReturnValue(createDetailMock());
});

describe('App Router', () => {
  it('renders HomePage at "/"', async () => {
    const memoryRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/'],
    });
    render(
      <Provider store={store}>
        <RouterProvider router={memoryRouter} />
      </Provider>
    );
    expect(await screen.findByText(/explore pokemons/i)).toBeInTheDocument();
  });

  it('renders Aboutpage at "/about"', async () => {
    const memoryRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/about'],
    });
    render(
      <Provider store={store}>
        <RouterProvider router={memoryRouter} />
      </Provider>
    );
    expect(await screen.findByRole('heading')).toBeInTheDocument();
  });
  it('renders NonFoundPage at unknown route', async () => {
    const memoryRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/*'],
    });
    render(
      <Provider store={store}>
        <RouterProvider router={memoryRouter} />
      </Provider>
    );
    const title = screen.findByRole('heading');
    expect(await title).toBeInTheDocument();
  });
  it('renders DetailedItem via loader at /page/details/:id', async () => {
    (useGetTermByIdQuery as vi.Mock).mockReturnValue(
      createDetailMock({
        data: {
          name: 'bulbasaur',
          imgSrc: '/bulbasaur.png',
          weight: 69,
        },
      })
    );
    const memoryRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/1/details/1'],
    });
    render(
      <Provider store={store}>
        <RouterProvider router={memoryRouter} />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });
});
