const path = require('path');

exports.index = (req, res) => {
    res.render(path.resolve('views/pages/index.ejs'));    
};