/* eslint-disable linebreak-style */
// const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/./../../.env` });

// const pgUrl = 'postgres://fgitxgtq:iX2xv7gauYS89wgBGN8gfi21Vfqe53bp@jelani.db.elephantsql.com/fgitxgtq';

const {
  PG_PORT,
  PG_DATABASE,
  PG_HOST,
  PG_USER,
  PG_PASSWORD,
  NODE_ENV,
} = process.env;

const credentials = {
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
};

const pool = new Pool(credentials);

// CHECK IF EXISTS
// pool.query(`
// SELECT EXISTS (
//   SELECT FROM 
//       information_schema.tables 
//   WHERE 
//       table_schema LIKE 'public' AND 
//       table_type LIKE 'BASE TABLE' AND
//       table_name = 'users'
//   );`)
//   .then((exists) => console.log('users exists:', exists.rows[0]))
//   .catch((err) => console.log('query error: ', err));

const createTables = () => {
  pool.query(`CREATE TABLE IF NOT EXISTS users (
    username VARCHAR PRIMARY KEY,
    password VARCHAR NOT NULL
  );`);
  pool.query(`CREATE TABLE IF NOT EXISTS events (
    _id serial PRIMARY KEY,
    name VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    time TIMESTAMP NOT NULL,
    description VARCHAR NOT NULL,
    username VARCHAR REFERENCES users(username)
    ON DELETE CASCADE
  );`);
  // TODO: make rsvp plural
  pool.query(`CREATE TABLE IF NOT EXISTS rsvp (
    _id serial PRIMARY KEY,
    username VARCHAR REFERENCES users(username)
    ON DELETE CASCADE,
    event_id INTEGER REFERENCES events(_id)
    ON DELETE CASCADE
  );`);
};

// const dropTables = (tableNames) => {
  // tableNames.forEach((tableName) => {
  //   pool.query('DROP TABLE IF EXISTS $1 CASCADE', [tableName]);
  // });
// };
const dropTables = () => {
  // rsvp drop should cascade and drop users ad events as well
  pool.query('DROP TABLE rsvp IF EXISTS CASCADE;');
};

const seedTables = () => {
  const timeStamp1 = '2022-03-19T04:37:00.000Z';
  const timeStamp2 = '2022-03-12T06:35:00.000Z';
  const timeStamp3 = '2021-02-23T10:45:00.000Z';
  const timeStamp4 = '2022-06-30T22:37:00.000Z';
  const timeStamp5 = '2020-12-22T18:54:00.000Z';

  // for users table create two users
  pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['Ben', '123']);
  pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['Daljit', '1234']);
  // for events table create 5 events
  pool.query(
    `INSERT INTO events (name, city, state, time, description, username) 
    VALUES ($1, $2, $3, $4, $5, $6);`,
    ['event1', 'New York', 'NY', timeStamp1, 'test event 1', 'Ben'],
  );
  pool.query(
    `INSERT INTO events (name, city, state, time, description, username) 
    VALUES ($1, $2, $3, $4, $5, $6);`,
    ['event2', 'Chicago', 'IL', timeStamp2, 'test event 2', 'Ben'],
  );
  pool.query(
    `INSERT INTO events (name, city, state, time, description, username) 
    VALUES ($1, $2, $3, $4, $5, $6);`,
    ['event3', 'Philadelphia', 'PA', timeStamp3, 'test event 3', 'Ben'],
  );
  pool.query(
    `INSERT INTO events (name, city, state, time, description, username) 
    VALUES ($1, $2, $3, $4, $5, $6);`,
    ['event4', 'Los Angeles', 'CA', timeStamp4, 'test event 4', 'Daljit'],
  );
  pool.query(
    `INSERT INTO events (name, city, state, time, description, username) 
    VALUES ($1, $2, $3, $4, $5, $6);`,
    ['event5', 'Hamilton', 'NJ', timeStamp5, 'test event 5', 'Daljit'],
  );
  // for rsvp table rsvp 2 events for one user, and 1 for the other
  pool.query(
    `INSERT INTO rsvp (username, event_id) 
    VALUES ($1, $2);`,
    ['Ben', 1],
  );
  pool.query(
    `INSERT INTO rsvp (username, event_id) 
    VALUES ($1, $2);`,
    ['Ben', 2],
  );
  pool.query(
    `INSERT INTO rsvp (username, event_id) 
    VALUES ($1, $2);`,
    ['Daljit', 3],
  );
};

// RESET TABLES FOR TESTING
if (NODE_ENV === 'resetdb') {
  // DELETE ALL DATA FROM DB
  // NOTE: Make sure to not start with users since they don't cascade upon drop
  // const tableNames = ['events', 'rsvp', 'users'];
  dropTables();
  // RECREATE TABLES
  createTables();
  // SEED TABLES WITH INITIAL DATA
  seedTables();
} else {
  createTables();
}

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
