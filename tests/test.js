import React from 'react';
// import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import { MemoryRouter } from 'react-router-dom';

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
// import { ExpansionPanelActions } from '@material-ui/core';
xdescribe('App renders SignUpLoginPage on startup', () => {
  describe('Testing Sign Up component', () => {
    let signUp;
    const props = {
      saveUser: jest.fn(),
    };

    beforeEach(() => {
      const app = render(<App />);
      signUp = app.firstChild;
      // signUp = render(<SignUp {...props} />);
    });

    test('Sign up renders', () => {
      expect(signUp.getByRole('heading', { level: 1 })).toHaveTextContent('Sign Up');
    });

    test('Input boxes render', () => {
      expect(signUp.getByPlaceholderText('Username')).not.toBeNull();
      expect(signUp.getByPlaceholderText('Password')).not.toBeNull();
    });

    test('signUp should be invoked on click', () => {
      const signUpBtn = signUp.getByRole('button', { name: 'Sign Up' });
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
      logIn = render(<LogIn {...props} />)
    });

    test('Log In renders', () => {
      expect(logIn.getByRole('heading', { level: 1 })).toHaveTextContent('Log In');
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


xdescribe('Testing components rendering', () => {
  let text;

  const props = {
    signUp: SignUp,
    logIn: LogIn,
    SignUpLoginPage,
  };

  beforeEach(() => {
    text = render(<App {...props} />)
  });

  test('"Sign up" and "Log in" renders', () => {
    expect(text.getByRole('heading', { level: 1 })).toHaveTextContent('Log In');
    expect(text.getByRole('heading', { level: 1 })).toHaveTextContent('Sign Up');
  });

  xtest('The functions passed down should be invoked on click', () => {
    const logInBtn = text.getByRole('button', { name: 'Log In' });
    const signUpBtn = text.getByRole('button', { name: 'Log In' });
    fireEvent.click(logInBtn);
    fireEvent.click(signUpBtn);
    expect(props.logIn).toHaveBeenCalledTimes(1);
    expect(props.signUp).toHaveBeenCalledTimes(1);
  });
});



xdescribe('Ben test', () => {
  let sidebar;

  const props = {
    formOpened: false,
  };

  beforeEach(() => {
    sidebar = render(<SideBarContainer {...props} />);
  });

  test('Testing child components render', () => {
    const createEvent = sidebar.getByRole('button', { name: 'Create Your Own Event' });
    expect(createEvent).toHaveTextContent('Search');
  });
});

describe('App renders components', ()=> {
  let app;
  // beforeEach(async () => {
  //   app = await render(
  //     <App />
  //   );
  // });
  beforeEach(() => {
    app = render(<App />);
  });

  test('"Sign up" and "Log in" buttons', () => {
    // expect(app.getByRole('button', { name: 'Sign Up' }));
    // expect(app.getByRole('button', { name: 'Log In' }));
    expect(app.getByRole('h4', { name: 'Work on scratch project' })).toHaveTextContent('Work on scratch project');
    // expect(app.getByText('asdfat'));
  });
});

xdescribe('Memory router', ()=> {
  let app;
  // beforeEach(async () => {
  //   app = await render(
  //     <App />
  //   );
  // });
  beforeEach(() => {
    app = render(
    // <MemoryRouter initialEntries = {['/HomePage']}>
      <App />
    // </MemoryRouter>,
    );
  });

  test('"Sign up" and "Log in" buttons', () => {
    // expect(app.getByRole('button', { name: 'Sign Up' }));
    // expect(app.getByRole('button', { name: 'Log In' }));
    expect(app.getByRole('heading', { level: 4 })).toHaveTextContent('Work for scratch project');
    expect(app.getByText('Work for scratch project')).toBe('Work for scratch project');
  });
});
