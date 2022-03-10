/**
 * @description This file will hold the initial state of our application
 * for use by redux.
 */

// NOTE: keep this as flat as possible for ease of use
 const initialState = {
  /**
   * @Authentication
   */
  userName: '',
  isAuthenticated: false,
  // TODO: make cookie or something similar for storing authentication state
  // What details about the auth cookie should redux have?

  /**
   * @Events
   */
  // TODO: update state when we make initial GET req after login
  // START WITH JUST RSVPD EVENTS
  Events: [],
  /**
   * @Filters
   */
  Filters: [],

  // TODO: Determine what needs to be in Redux from frontend UI
  /**
   * @UI
   */
};

export default initialState;