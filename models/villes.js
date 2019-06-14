var mongoose = require('mongoose');

var villeSchema = mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    temp_min: Number,
    temp_max: Number,
    lat: Number,
    lng: Number,
});



var villeModel = mongoose.model('villes', villeSchema);

module.exports = villeModel;


