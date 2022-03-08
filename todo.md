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