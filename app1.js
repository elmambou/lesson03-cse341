const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;

const contactRoutes = require('./routes/contacts');
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

// Initialize MongoDB connection
mongodb.initDb((err, dbClient) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    app.locals.db = dbClient.db(); // Set MongoDB database instance to app.locals

    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
      console.log(`http://localhost:${port}/contacts`);
    });
  }
});
