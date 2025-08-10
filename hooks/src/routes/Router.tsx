import { createBrowserRouter } from 'react-router';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { App } from '../App';
import { NotFound } from '../pages/NotFound';
import { DetailedItem } from '../components/Detailed-item';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/:page',
        element: <HomePage />,
        children: [
          {
            path: 'details/:id',
            element: <DetailedItem />,
            // // loader: ({ params }) => fetchItem(Number(params.id)),
            // loader: ({ params }) => useGetTermByIdQuery(Number(params.id)),
          },
        ],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
