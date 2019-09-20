var mongoose = require('mongoose');

var options = { connectTimeoutMS: 5000, useNewUrlParser: true }

mongoose.connect('///////',
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