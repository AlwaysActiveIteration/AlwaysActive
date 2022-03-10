const db = require('../models/model');

const eventController = {
  addEvent: (req, res, next) => {
    const queryString = 'INSERT INTO events (name, city, state, time, description, username) VALUES ($1, $2, $3, $4, $5, $6);';
    const rawDateTime = new Date(`${req.body.date}T${req.body.time}`);
    const timeStamp = rawDateTime.toISOString();
    db.query(
      queryString,
      [
        req.body.name,
        req.body.city,
        req.body.state,
        timeStamp,
        req.body.description,
        req.body.username,
      ],
      (err) => {
        if (err) return next(err);
        return next();
      },
    );
  },
  deleteEvent: (req, res, next) => {
    const queryString = 'DELETE FROM events WHERE _id = $1';
    db.query(
      queryString,
      [req.body.event_id],
      (err) => {
        if (err) { return next(err); }
        return next();
      },
    );
  },
  getEvents: (req, res, next) => {
    // TODO: make readable
    // TODO: figure out how to prevent someone from sending a req that passes in username of
    // another user
    /**
     * @description
     * This query finds
     * all events and finds info on which events user rsvp'd (star) by querying the rsvp table.
     * Count will be in response.rowCount
     * userStatus only exists in this query. It takes on the evaluated result of the CASE statment
     * (TRUE or FALSE according to whether or not the user rsvp'd).
     * Inside CASE we check to see if there is anything that the user rsvp'd to
     */
    const queryString = `
    SELECT e.*, COUNT(r._id), 
      CASE WHEN EXISTS 
        (SELECT * FROM rsvp r WHERE r.event_id = e._id AND r.username = $1) 
      THEN TRUE 
      ELSE FALSE END userStatus 
      FROM events e LEFT JOIN rsvp r ON e._id = r.event_id 
    GROUP BY e._id 
    ORDER BY e.time ASC;`;

    db.query(
      queryString,
      [req.body.username],
      (err, events) => {
        if (err) { return next(err); }
        console.log('events', events);
        res.locals.events = events.rows;
        return next();
      },
    );
  },

  // TODO: Delete
  // GET RSVP
  // getEvents: (req, res, next) => {
  //   const queryString = `
  //   SELECT e.*, 
  //     CASE WHEN EXISTS 
  //       (SELECT * FROM rsvp r WHERE r.event_id = e._id AND r.username = $1) 
  //     THEN TRUE 
  //     ELSE FALSE END userStatus 
  //     FROM events e
  //   GROUP BY e._id 
  //   ORDER BY e.time ASC;`;
  //   db.query(
  //     queryString,
  //     [req.body.username],
  //     (err, events) => {
  //       if (err) { return next(err); }
  //       console.log('events', events);
  //       res.locals.events = events.rows;
  //       return next();
  //     },
  //   );
  // },

  filterEvents: (req, res, next) => {
    /**
     * @description
     * Same as above. Returning only rsvp'd to events except also applying filters
     */
    // TODO: filter this on the frontend
    const queryString = `
    SELECT e.*, COUNT(r._id),
      CASE WHEN EXISTS 
        (SELECT * FROM rsvp r WHERE r.event_id = e._id AND r.username = $1)
      THEN TRUE 
      ELSE FALSE END userStatus 
    FROM events e LEFT JOIN rsvp r ON e._id = r.event_id 
    WHERE e.city = $2 AND e.state = $3 
    GROUP BY e._id 
    ORDER BY e.time ASC;`;
    db.query(
      queryString,
      [
        req.body.username,
        req.body.city,
        req.body.state,
      ],
      (err, events) => {
        if (err) return next(err);
        res.locals.filteredEvents = events.rows;
        return next();
      },
    );
  },
};

module.exports = eventController;
