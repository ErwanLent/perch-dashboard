const axios = require('axios');
const path = require('path');

exports.index = (req, res) => {
    axios.get("http://flask-env.qfkjpmpp82.us-west-2.elasticbeanstalk.com/random_truck_schedule")
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