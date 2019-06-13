var mongoose = require('mongoose');

var villeSchema = mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    temp_min: Number,
    temp_max: Number,
});

module.exports = mongoose.model('villes', villeSchema);


var villeModel = mongoose.model('cities', villeSchema);

module.exports = villeModel;


