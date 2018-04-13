const cacher = require('./request-cacher');
const express = require('express');
const router = express.Router();

/* ==========================================================================
   Controllers
   ========================================================================== */

const defaultController = require('../controllers/defaultController');

/* ==========================================================================
   Main Page Routes
   ========================================================================== */
   
// router.post('/api/test', defaultController.test);


/* ==========================================================================
   Wildcard
   ========================================================================== */

router.get('*', defaultController.index);

module.exports = router;