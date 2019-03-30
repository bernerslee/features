var mongoose = require('mongoose');

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

//create models
var Features = mongoose.model('Features', featureSchema );
var Interior = mongoose.model('Interior', interiorSchema );

module.exports = {Features, Interior};