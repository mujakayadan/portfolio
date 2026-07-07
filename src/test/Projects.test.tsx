import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Projects from '../components/Projects';

const mockProjects = Array.from({ length: 8 }, (_, index) => ({
  name: `Project ${index + 1}`,
  description: `Description ${index + 1}`,
  tags: [{ name: 'React', color: 'blue-text-gradient' }],
  image: '/placeholder.png',
}));

vi.mock('../context/PortfolioContext', () => ({
  usePortfolio: () => ({
    projects: mockProjects,
  }),
}));

describe('Projects', () => {
  it('reveals more projects when Load More Projects is clicked', () => {
    render(<Projects />);

    expect(screen.getByText('Project 6')).toBeInTheDocument();
    expect(screen.queryByText('Project 7')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /load more projects/i }));

    expect(screen.getByText('Project 7')).toBeInTheDocument();
    expect(screen.getByText('Project 8')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load more projects/i })).not.toBeInTheDocument();
  });
});
