const express = require('express');
const path = require('path');

const PORT = 3000;

const router = require('./routes/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: figure out what's going on here
// This is because of package/json never setting the variable to dev
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../build/index.html')));
}

app.use('/', router);

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
