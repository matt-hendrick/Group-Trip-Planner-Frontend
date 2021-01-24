import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header tests', () => {
  it('Renders Header page on init', () => {
    render(<Header headerTitle="example" />);
    expect(screen.getByRole('heading', /example/i)).toBeInTheDocument();
  });
});
