import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Demo from './Demo';

describe('Demo tests', () => {
  it('Renders Demo page on init', () => {
    render(
      <MemoryRouter>
        <Demo />
      </MemoryRouter>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
