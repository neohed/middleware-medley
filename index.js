const express = require('express');
const cors = require('cors');
const morganLogger = require('morgan');
const bodyParser = require('body-parser');
const {routeNotFoundHandler} = require('./middleware/404-handler');

const env = process.env.NODE_ENV || 'development';
const app = express();

if (env === 'development') {
    app.use(cors());
}

app.use(morganLogger('dev')); //This logs requested routes to stdout in dev.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(routeNotFoundHandler('Snark Hunt! 404'));

const port = 4057;

app.listen({port}, async () => {
    const baseUrl = `http://localhost:${port}`;

    console.log(`Rest API \t @ ${baseUrl}/`);
});
