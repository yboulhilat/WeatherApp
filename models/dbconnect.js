var mongoose = require('mongoose');

var options = { connectTimeoutMS: 5000, useNewUrlParser: true }

mongoose.connect('mongodb+srv://bouls:Bouls08128989@yousseflacapsule-hmk9t.mongodb.net/WeatherApp?retryWrites=true&w=majority',
    options,
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Mango DB Ok");
        }
    }
);

module.exports = mongoose;