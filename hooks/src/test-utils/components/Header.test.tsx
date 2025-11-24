import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';

describe('Header', () => {
  it('renders header element with correct class', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');
  });

  it('renders container with correct class', () => {
    render(<Header />);
    const container = screen
      .getByRole('banner')
      .querySelector('.header-container');
    expect(container).toHaveClass('container', 'header-container');
  });

  it('renders logo with correct attributes', () => {
    render(<Header />);
    const logo = screen.getByRole('img', { name: /logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'src/assets/logo.png');
    expect(logo).toHaveAttribute('alt', 'logo');
    expect(logo.closest('div')).toHaveAttribute('role', 'logo');
  });

  it('renders navigation with correct structure', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('navbar');
    expect(nav.querySelector('.navbar-list')).toBeInTheDocument();
  });

  it('renders correct number of navigation links', () => {
    render(<Header />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  it('renders Home link with correct href', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveClass('navbar-link');
  });

  it('renders About link with correct href', () => {
    render(<Header />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(aboutLink).toHaveClass('navbar-link');
  });

  it('renders navigation items with correct class', () => {
    render(<Header />);
    const navItems = screen.getAllByRole('listitem');
    expect(navItems).toHaveLength(2);
    navItems.forEach((item) => {
      expect(item).toHaveClass('navbar-item');
    });
  });
});
