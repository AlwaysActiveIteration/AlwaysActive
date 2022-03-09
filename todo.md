TODO:

- dotenv setup
- crossenv
- react-router (isomorphic routes)
- clean up PUT request for events (username needs to be sent via req.params)
- FIX: rsvping and deleting are implemented with two different flows (deleting will get the entire list of events again
whereas rsvping will update a local state toggle if the fetch succeeds so it doesn't have to refresh the page and filtering
persists)
- Look into server.js and figure out why they are checking production versus dev mode
- Expand on global error handling
- Fix package.json not distiguishing between prod and dev mode in scripts
- Pass back deleted or posted entities in SQL queries

Research:
- why is setstate function wrapped inside another function?: SignUpLoginPage.jsx
  - useEffect for component did mount
- useLocation, why? is it even being used? SignUpLoginPage.jsx - alex?

REDUX:
- username passed in via useLocation hook SignUpLoginPage.jsx // used in Homepage.jsx
- 