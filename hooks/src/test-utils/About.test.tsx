import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutPage } from '../pages/AboutPage';

describe('<AboutPage />', () => {
  it('renders the name heading', () => {
    render(<AboutPage />);
    const heading = screen.getByRole('heading', { name: /amrillo/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('about-title');
  });

  it('renders the about paragraph', () => {
    render(<AboutPage />);
    const paragraph = screen.getByText(/Lorem ipsum/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('about-text');
  });

  it('has the correct layout structure', () => {
    render(<AboutPage />);
    expect(screen.getByRole('region')).toHaveClass('about');
    expect(document.querySelector('.container')).toBeInTheDocument();
  });
});
