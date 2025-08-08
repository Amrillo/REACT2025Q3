import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './routes/Router';
import { ThemeProvider } from './contexts/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from './store/reduxStore';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <Provider store={store}>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
      </Provider> 
    </StrictMode>
  );
}
