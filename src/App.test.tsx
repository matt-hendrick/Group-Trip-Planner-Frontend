import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App tests', () => {
  it('App renders Login page by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /here/i })).toBeInTheDocument();
  });
});
