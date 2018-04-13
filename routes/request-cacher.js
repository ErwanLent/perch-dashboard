const crypto = require('crypto');
const memCache = require('memory-cache');
const os = require('os');

exports.TINY_CACHE = 180; // 3 minutes
exports.SHORT_CACHE = 600; // 10 minutes
exports.MEDIUM_CACHE = 1800; // 30 minutes

exports.DAY_CACHE = 86400; // 1 day
exports.WEEK_CACHE = 604800; // 1 week
exports.MONTH_CACHE = 2629746; // 1 month

let gets = 0;
let puts = 0;

const cacheStartDate = new Date().toDateString();

const CONTROL_TOKEN = '79eaac5e9f3d8d03b93a05c2580af8e9c6d86a70';

exports.cache = (duration) => {
    return (req, res, next) => {
        const hashedBody = crypto.createHash('md5').update(JSON.stringify(req.body)).digest('hex');
        const key = `${(req.originalUrl || req.url)}-${hashedBody}`;
        const cachedBody = memCache.get(key);

        if (cachedBody) {
            gets++;
            res.json(JSON.parse(cachedBody))
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                if (duration > 0) {
                    memCache.put(key, body, duration * 1000);
                } else {
                    memCache.put(key, body);
                }

                puts++;
                res.sendResponse(body)
            }
            next();
        }
    }
};

exports.viewStats = (req, res) => {
    // Auth check
    if (!req.body.token || req.body.token != CONTROL_TOKEN) {
        res.json({
            status: 'error',
            message: 'Invalid token.'
        });

        return;
    }

    res.json({
        status: 'success',
        cacheStartDate,
        machine: {
            freeMemory: (os.freemem() / 1048576).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' MB',
            totalMemory: (os.totalmem() / 1048576).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' MB',
            memoryUsed: Math.ceil(os.freemem() / os.totalmem() * 100) + '%'
        },
        count: memCache.size(),
        gets,
        puts
    });
};

exports.viewKeys = (req, res) => {
    // Auth check
    if (!req.body.token || req.body.token != CONTROL_TOKEN) {
        res.json({
            status: 'error',
            message: 'Invalid token.'
        });

        return;
    }

    res.json({
        status: 'success',
        keys: memCache.keys()
    });
};

exports.clearEndpointCache = (req, res) => {
    // Auth check
    if (!req.body.token || req.body.token != CONTROL_TOKEN) {
        res.json({
            status: 'error',
            message: 'Invalid token.'
        });

        return;
    }

    const endpoint = req.params.endpoint;

    if (!endpoint) {
        res.json({
            status: 'error',
            message: 'No endpoint provided.'
        });

        return;
    }

    let isEndpointDeleted = false;
    for (const key of memCache.keys()) {
        if (key.includes(endpoint)) {
            memCache.del(key);
            isEndpointDeleted = true;
        }
    }

    if (!isEndpointDeleted) {
        res.json({
            status: 'error',
            message: 'Endpoint not found.'
        });

        return;
    }

    res.json({
        status: 'success',
        message: 'Cleared endpoint cache.'
    });
};

exports.clearAllCache = (req, res) => {
    // Auth check
    if (!req.body.token || req.body.token != CONTROL_TOKEN) {
        res.json({
            status: 'error',
            message: 'Invalid token.'
        });

        return;
    }

    memCache.clear();

    res.json({
        status: 'success',
        message: 'Cleared all endpoint caches.'
    });
};