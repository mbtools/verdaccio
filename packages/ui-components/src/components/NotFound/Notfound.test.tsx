import React from 'react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test, vi } from 'vitest';

import { act, fireEvent, render, renderWith, screen } from '../../test/test-react-testing-library';
import NotFound from './NotFound';

const mockNavigate = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('<NotFound /> component', () => {
  test('announces each missing path once, including client-side navigation', async () => {
    const onNotFound = vi.fn();
    window.addEventListener('verdaccio:ui:404', onNotFound);
    const { createMemoryRouter, RouterProvider } = await import('react-router');
    const router = createMemoryRouter([{ path: '*', element: <NotFound /> }], {
      initialEntries: ['/missing'],
    });

    try {
      const view = renderWith(<RouterProvider router={router} />);
      expect(onNotFound).toHaveBeenCalledTimes(1);

      view.rerender(<RouterProvider router={router} />);
      expect(onNotFound).toHaveBeenCalledTimes(1);

      await act(() => router.navigate('/another-missing-page'));
      expect(onNotFound).toHaveBeenCalledTimes(2);
    } finally {
      window.removeEventListener('verdaccio:ui:404', onNotFound);
      router.dispose();
    }
  });

  test('should load the component in default state', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByTestId('FolderOffIcon')).toBeInTheDocument();
    expect(screen.getByText('button.go-to-the-home-page')).toBeInTheDocument();
    expect(screen.getByText('error.404.sorry-we-could-not-find-it')).toBeInTheDocument();
  });

  test('go to Home Page button click', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const node = getByTestId('not-found-go-to-home-button');
    fireEvent.click(node);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
