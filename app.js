/* ==========================================================================
   Express Dependencies
   ========================================================================== */

const express = require('express'),
    config = require('./config'),
    http = require('http'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    compression = require('compression'),
    contentLength = require('express-content-length-validator'),
    routes = require('./routes/index');


/* ==========================================================================
   Variables
   ========================================================================== */

const SERVER_ENVIRONMENT = (process.env.SERVER_ENVIRONMENT || "LOCAL");
const CONFIG_ENVIRONMENT = config.environment;
const MAX_CONTENT_LENGTH_ACCEPTED = 9999;

// Init express server
const app = express();

// all environments
app.set('environment', SERVER_ENVIRONMENT);
app.set('port', process.env.PORT || config.port);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(contentLength.validateMax({
    max: MAX_CONTENT_LENGTH_ACCEPTED,
    status: 400,
    message: "Payload too large."
}));

app.use(cookieParser());

// Configure session
app.use(session({
    secret: config.secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 60 * 24 * 30)
    },
    name: "session"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(compression());

if (CONFIG_ENVIRONMENT == 'LOCAL') {
    app.use(logger('dev'));
}

// Custom headers
app.use(function(req, res, next) {
    res.header('Server', 'Mordor');
    res.header("x-powered-by", "ExCentric Team");
    next();
});

app.get('/health', (req, res) => res.json({
    status: 'ok'
}));

app.use('/', routes);

app.use(function(err, req, res, next) {
    console.log(err);
    res.send('Oops, something went wrong!');
});

app.use(function(req, res) {
    res.status(404);
    res.send('404');
});

app.listen(app.get('port'), function() {
    console.log('Server running on port ' + app.get('port'));
});

module.exports = app;