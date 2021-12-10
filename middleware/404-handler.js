const {statusCodes} = require('../utility/http');

const routeNotFoundHandler = message => (req, res, next) => {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const errorMessage = `${message} "${req.originalUrl}" not found! Full URL: "${fullUrl}"`;
    const err = new Error(errorMessage);
    err.status = statusCodes.notFound;

    res.status(statusCodes.notFound).send(errorMessage)

    next(err);
}

module.exports = {
    routeNotFoundHandler,
}
