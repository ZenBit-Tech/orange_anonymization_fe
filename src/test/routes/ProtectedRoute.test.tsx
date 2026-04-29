import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

describe('ProtectedRoute', () => {
  it('renders without crash', () => {
    const { container } = renderWithProviders(<ProtectedRoute />);

    expect(container).toBeDefined();
  });
});
