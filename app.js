const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;
const app = express();

const contactRoutes = require('./routes/contacts');

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });

mongodb.initDb()
    .then(() => {
        app.locals.db = mongodb.getDb();

        app.use('/', require('./routes'));
        app.use('/contacts', contactRoutes);

        app.listen(port, () => {
            console.log(`Connected to DB and listening on ${port}`);
            console.log(`http://localhost:${port}/contacts`);
        });
    })
    .catch((err) => {
        console.error('Error starting the app:', err);
    });
