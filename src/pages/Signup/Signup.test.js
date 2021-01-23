import React from 'react';
import { render, screen } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import Signup from './Signup';

describe('Signup tests', () => {
  it('Renders Signup by default', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    expect(getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
    expect(getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(getByRole('textbox', { name: /handle/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /here/i })).toBeInTheDocument();
  });
});
