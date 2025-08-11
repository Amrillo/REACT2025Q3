import { vi } from 'vitest';
import { createRoot } from 'react-dom/client';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn().mockReturnValue({
    render: vi.fn(),
  }),
}));

vi.mock('../index.css', () => ({}));

describe('index.tsx', () => {
  beforeEach(() => {
    vi.spyOn(document, 'getElementById').mockReturnValue(document.createElement('div'));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the app without crashing', async () => {
    // Load the index file to execute it
    await import('../index.tsx');

    expect(document.getElementById).toHaveBeenCalledWith('root');
    expect(createRoot).toHaveBeenCalledWith(expect.any(HTMLElement));
    expect(createRoot().render).toHaveBeenCalledTimes(1);
  });
});