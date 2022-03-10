import React from 'react';
// import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import { Router, Routes, Route, MemoryRouter } from 'react-router-dom';
import SignUpLoginPage from '../client/components/SignUpLoginPage';
import SignUp from '../client/components/SignUp';
import HomePage from '../client/containers/HomePage';
import SideBarContainer from '../client/containers/SideBarContainer';
import LogIn from '../client/components/LogIn';
import App from '../client/App';
import '@testing-library/jest-dom/extend-expect';
import CreateEventButton from '../client/components/CreateEventButton';
import EventsContainer from '../client/containers/EventsContainer';
import EventBox from '../client/components/EventBox'

describe('Testing SignUpLoginPage', () => {
  describe('Testing SignUpLoginPage renders on startup', () => {
    let app;

    beforeEach(() => {
      app = render(<MemoryRouter initialEntries={['/HomePage', '/']} initialIndex={1}> <App /> </MemoryRouter>);
    });

    test('Sign up renders', () => {
      expect(app.getByRole('heading', { level: 1, name: 'Sign Up' })).toHaveTextContent('Sign Up');
    });

    test('Log In renders', () => {
      expect(app.getByRole('heading', { level: 1, name: 'Log In' })).toHaveTextContent('Log In');
    });
  });

  describe('Testing Sign Up component', () => {
    let signup;
    const props = {
      saveUser: jest.fn(),
    };

    beforeEach(() => {
      signup = render(<SignUp {...props} />);
    });

    test('Input boxes render', () => {
      expect(signup.getAllByPlaceholderText('Username')).not.toBeNull();
      expect(signup.getAllByPlaceholderText('Password')).not.toBeNull();
    });

    test('signUp should be invoked on click', () => {
      const signUpBtn = signup.getByRole('button', { name: 'Sign Up' });
      fireEvent.click(signUpBtn); 
      expect(props.saveUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing Log In component', () => {
    let logIn;
    const props = {
      logIn: jest.fn(),
    };

    beforeEach(() => {
      logIn = render(<LogIn {...props} />);
    });

    test('Input boxes render', () => {
      expect(logIn.getByPlaceholderText('Username')).not.toBeNull();
      expect(logIn.getByPlaceholderText('Password')).not.toBeNull();
    });

    test('logIn should be invoked on click', () => {
      const logInBtn = logIn.getByRole('button', { name: 'Log In' });
      fireEvent.click(logInBtn);
      expect(props.logIn).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Testing Homepage', () => {
  let homepage;

  beforeEach(() => {
    homepage = render(<MemoryRouter> <HomePage />  </MemoryRouter>);
  });

  describe('Testing Sidebar', () => {
    test('city input box renders', () => {
      expect(homepage.getByPlaceholderText('city')).not.toBeNull();
    });

    test('state input box renders', () => {
      expect(homepage.getByPlaceholderText('state')).not.toBeNull();
    });

    test('search button renders', () => {
      expect(homepage.getByText('search')).not.toBeNull();
    });

    test('create your own event button renders', () => {
      expect(homepage.getByText('Create Your Own Event')).not.toBeNull();
    });
  });
});

describe('Memory router', ()=> {
  let app;
  beforeAll(() => {
    app = render(
    <MemoryRouter initialEntries={["/HomePage"]}>
      <App />
    </MemoryRouter>
    );
  });

  test('"Sign up" and "Log in" buttons', () => {
    // expect(app.getByRole('button', { name: 'Sign Up' }));
    // expect(app.getByRole('button', { name: 'Log In' }));
    expect(app.getByText('Test'));
  });
});
