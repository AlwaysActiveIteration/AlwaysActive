const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
require('./auth');
// we aren't going to be using the variable -> just want to load in auth.js
const PORT = 3000;
const cors = require('cors');
const router = require('./routes/router');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: figure out what's going on here
// This is because of package/json never setting the variable to dev
// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static(path.join(__dirname, '../build')));

//   app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../build/index.html')));
// }

// app.use('/', router);

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/google/auth',
  passport.authenticate('google', {
    failureRedirect: '/signup',
  }),
  (req, res) => {
    res.redirect('/hello');
  }
);

app.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => {
    res.redirect('/google/auth')
  }
  // handle response
);

app.get('/hello', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>'); // add this to index.html
});

app.get('/logout', (req, res) => {
  req.logout();
  res.send('goodbye');
});

app.use((req, res) => {
  res.sendStatus(404);
});

// TODO: expand on error handling
app.use((err, req, res) => {
  console.log(err);
  res.status(500).json(err);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
