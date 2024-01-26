// Application initialization

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
  .use('/', require('./routes'))


  mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port); 
      console.log(`Connected to DB and listening on ${port}`);
      console.log(`ctrl+click http://localhost:${port}/contacts`)
      }
    });
