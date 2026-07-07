import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-confetti', () => ({
  default: () => null,
}));

vi.mock('react-hot-toast', () => ({
  Toaster: () => null,
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('../components/canvas/Earth', () => ({
  default: () => <div data-testid="earth-canvas" />,
}));

import Contact from '../components/Contact';
import { PortfolioProvider } from '../context/PortfolioContext';

describe('Contact', () => {
  it('requires all fields before submitting', async () => {
    const { toast } = await import('react-hot-toast');

    render(
      <PortfolioProvider>
        <Contact />
      </PortfolioProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(toast.error).toHaveBeenCalled();
  });

  it('opens a prefilled mailto link when the form is valid', async () => {
    const { toast } = await import('react-hot-toast');
    let href = '';
    const locationSpy = vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      assign: (value: string) => {
        href = value;
      },
      set href(value: string) {
        href = value;
      },
      get href() {
        return href;
      },
    } as Location & { assign: (value: string) => void });

    render(
      <PortfolioProvider>
        <Contact />
      </PortfolioProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Your name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your email'), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Hey Muja/i), {
      target: { value: 'Interested in collaborating.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(href).toContain('mailto:mujakayadan@outlook.com');
    expect(href).toContain('Jane%20Doe');
    expect(toast.success).toHaveBeenCalled();

    locationSpy.mockRestore();
  });
});
