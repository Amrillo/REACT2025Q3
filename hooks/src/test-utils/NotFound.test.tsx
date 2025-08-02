import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages/NotFound';

describe('<NotFoundpage />', () => {
  it('renders the title text corretly', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
