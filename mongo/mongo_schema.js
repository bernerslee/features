var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/interior', {useNewUrlParser: true});


var featureSchema = new mongoose.Schema({
    house_id: Number,
    year_built: String,
    heating: String,
    cooling: String,
    parking: String,
    lot: String,
    days_on_zillow: String,
    price_per_sqft: String
});

var interiorSchema = new mongoose.Schema({
    feature_id: Number,
    bedrooms: String,
    bathrooms: String,
    appliances: String,
    kitchen: String,
    flooring: String,
    house_id: String,
    sqft: String
});

var close = () => {
    mongoose.disconnect();
}

//create models
var features = mongoose.model('features', featureSchema );
var interior = mongoose.model('interior', interiorSchema );

module.exports = {features, interior, close};