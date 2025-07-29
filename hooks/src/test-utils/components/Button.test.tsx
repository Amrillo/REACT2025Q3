import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../../components/ui/Button';

describe('Button', () => {
  const mockCloseIcon = '../../assets/icon-close.svg';
  it('renders button with correct className', () => {
    const testClassName = 'test-button-class';
    render(<Button closeIcon={mockCloseIcon} classname={testClassName} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(testClassName);
  });
  it('renders button with image and correct alt text', () => {
    render(<Button closeIcon={mockCloseIcon} />);
    const img = screen.getByAltText('close icon');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockCloseIcon);
  });

  it('calls onCloseItem when provided and button is clicked', () => {
    const mockOnCloseItem = vi.fn();
    render(<Button closeIcon={mockCloseIcon} onCloseItem={mockOnCloseItem} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(mockOnCloseItem).toHaveBeenCalledTimes(1);
  });
});
