/* ==========================================================================
   Imports
   ========================================================================== */

const auth = require('basic-auth');


/* ==========================================================================
   Authorizer Middleware
   ========================================================================== */

exports.authorize = (req, res, next) => {
    function unauthorized() {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    }    

    const user = auth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(req, res);
    };


    if (user.name == 'perch' && user.pass == 'hackathon') {
        return next();
    }

    return unauthorized(req, res);
};