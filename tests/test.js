import React from 'react';
// import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import SignUpLoginPage from '../client/components/SignUpLoginPage';
import SignUp from '../client/components/SignUp';
import LogIn from '../client/components/LogIn';
import '@testing-library/jest-dom/extend-expect';
// import { ExpansionPanelActions } from '@material-ui/core';

describe('Testing React components render text', () => {
  let text;

  beforeAll(() => {
    text = render(<SignUp />)
  });

  test('"Sign up" renders', () => {
    expect(text.getByRole('heading', { level: 1 })).toHaveTextContent('Sign Up');
  });
});
