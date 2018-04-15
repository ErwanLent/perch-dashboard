const axios = require('axios');
const path = require('path');

exports.index = (req, res) => {
    axios.get("https://pastebin.com/raw/PVCbgw6t")
        .then(function(response) {
            res.render(path.resolve('views/pages/index.ejs'), {
            	trucks: response.data.trucks
            });
        })
        .catch(function(error) {
            console.log(error);
            res.send('An Error Occurred');
        });
};