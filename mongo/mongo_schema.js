var mongoose = require('mongoose');

var featureSchema = new mongoose.Schema({
    house_id: {type: Number, unique: true},
    type: String,
    year_built: String,
    heating: String,
    cooling: String,
    parking: String,
    lot: String,
    days_on_zillow: String,
    price_per_sqft: String
});

var interiorSchema = new mongoose.Schema({
    feature_id: {type: Number, unique: true},
    bedrooms: String,
    bathrooms: String,
    appliances: String,
    kitchen: String,
    flooring: String,
    house_id: String,
    sqft: String
});

//create models
const features = mongoose.model('features', featureSchema );
const interior = mongoose.model('interior', interiorSchema );

module.exports = {features, interior};