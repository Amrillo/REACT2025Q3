import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../components/Footer';

describe('<Footer />', () => {
  it('renders author credit with GitHub link', () => {
    render(<Footer />);
    const authorLink = screen.getByRole('link', { name: /amrillo/i });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute(
      'href',
      'https://github.com/Amrillo/REACT2025Q3'
    );
    expect(authorLink).toHaveAttribute('target', '_blank');
    expect(authorLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows current year and rights reserved', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('renders course link with emoji and correct URL', () => {
    render(<Footer />);
    const courseLink = screen.getByRole('link', { name: /view react course/i });
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(courseLink).toHaveClass('footer-link');
  });
});
