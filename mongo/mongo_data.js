var faker = require('faker');
var Stopwatch = require('statman-stopwatch');
var db = require('./mongo_schema');

//set randomness seed
faker.seed(123);
var chunkSize = 100;

//create features data - return obj
const createFeatures = () => {
    return {
        Type: faker.random.arrayElement(['Single Family', 'Multifamily', 'Condo', 'Townhome']),
        Year_Built: faker.random.number({min:1900, max:2006}),
        Heating: faker.random.arrayElement(['Forced air', 'Fan', 'Speeder air']),
        Cooling: faker.random.arrayElement(['None', 'A/C', 'Central']),
        Parking: faker.random.arrayElement(['None', '1 Space', '2 Spaces', '3 Spaces']),
        Lot: faker.random.number({min: 1000, max:100000}),
        Days_on_zillow: faker.random.number({min: 1, max:100}),
    };
};
//create interior data

//create 100 records - return array of objects
var featureList = (id) => {
    var currentId = id * chunkSize;
    var result = [];
    for(var i = 0; i < chunkSize; i++){
        result.push(Object.assign( {'_id': currentId+i}, createFeatures() ));
    }
    return result;
};


