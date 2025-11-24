import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../../components/Pagination';

describe('<Pagination />', () => {
  const mockSetPage = vi.fn();
  it('disables "Prev" button on first page', () => {
    render(<Pagination page={1} totalpages={5} setPageChange={mockSetPage} />);
    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).toBeEnabled();
  });

  it('disables "Next" button on last page', () => {
    render(<Pagination page={5} totalpages={5} setPageChange={mockSetPage} />);
    expect(screen.getByText('Next')).toBeDisabled();
    expect(screen.getByText('Prev')).toBeEnabled();
  });

  it('calls setPage with page - 1 when "Prev" is clicked', () => {
    render(<Pagination page={3} totalpages={5} setPageChange={mockSetPage} />);
    fireEvent.click(screen.getByText('Prev'));
    expect(mockSetPage).toHaveBeenCalledWith('prev');
  });

  it('calls setPage with page + 1 when "Next" is clicked', () => {
    render(<Pagination page={3} totalpages={5} setPageChange={mockSetPage} />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockSetPage).toHaveBeenCalledWith('next');
  });

  it('displays the current page number', () => {
    render(<Pagination page={2} totalpages={5} setPageChange={mockSetPage} />);
    expect(screen.getByText('2')).toHaveClass('pagination-page');
  });
});
