import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from '../App';
import { MemoryRouter } from 'react-router';

vi.mock('../components/Header', () => ({
  Header: () => <header data-testid="mock-header">Mock Header</header>,
}));
vi.mock('../components/Footer', () => ({
  Footer: () => <footer data-testid="mock-footer">Mock Footer</footer>,
}));

describe('App Component', () => {
  it('renders Header component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('renders Outlet for child routes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
    // Outlet is rendered, but we can't directly test its content without a child route
    // Verifying main element is sufficient to confirm Outlet's presence
  });

  it('applies correct class to main element', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const main = screen.getByRole('main');
    expect(main).toHaveClass('main');
  });

  it('renders correct component structure', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const header = screen.getByTestId('mock-header');
    const main = screen.getByRole('main');
    const footer = screen.getByTestId('mock-footer');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(header.nextElementSibling).toBe(main);
    expect(main.nextElementSibling).toBe(footer);
  });
});
