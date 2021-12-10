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

app.use(function (req, res, next) {
    console.log('Application middleware. Time:', Date.now())
    next()
})

/*
app.use(function (req, res, next) {
    console.log('Second handler (does not call next, ends middleware chain) Time:', Date.now())
})
 */

const router = express.Router()

router.use(function (req, res, next) {
    console.log('Router middleware. Time:', Date.now())
    next()
})

router.get('/user', function (req, res, next) {
    console.log('Router middleware with mount path.')
    next('router')
})

router.get('/user', function (req, res, next) {
    console.log('Never called?') // Never called!
    next()
})

router.use(function (req, res, next) {
    console.log('Final router middleware, no mount path!. Time:', Date.now()) // Also never called!
    next()
})

app.use('/', router);

const router2 = express.Router()

router2.use(function (req, res, next) {
    console.log('Second router!. Time:', Date.now()) // Is called!
    next()
})

app.use('/', router2);

app.use(function (req, res, next) {
    console.log('Final application middleware. Time:', Date.now())
    next()
})

app.use(routeNotFoundHandler('Snark Hunt! 404'));

const port = 4057;

app.listen({port}, async () => {
    const baseUrl = `http://localhost:${port}`;

    console.log(`Rest API \t @ ${baseUrl}/`);
});
