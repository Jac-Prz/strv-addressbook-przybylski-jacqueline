const corsAllowedOrigins = require('./corsAllowedOrigins');

const corsOptions = {
    origin: function (origin, callback) {
        if (corsAllowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(newError('Not allowed by CORS'))
        };
    }
};