var faker = require('faker');
const knex = require('../knex/knex.js');
var Stopwatch = require('statman-stopwatch');
// const {performance} = require('perf_hooks');
//set randomness seed
faker.seed(123);

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

const createInterior = () =>{
    return {
        Bedrooms: faker.random.number({min:1, max:6}),
        Bathrooms: faker.random.number({min:1, max:5}),
        Appliances: faker.random.arrayElement(['Dishwasher','Dryer', 'Garbage disposal', 'Refrigerator', 'Washer']),
        Kitchen: faker.random.arrayElement(['Counter', 'Pantry', 'Updated Kitchen', 'Eat In Kitchen']),
        Flooring: faker.random.number({min:100, max:2000}),
        Sqft: faker.random.number({min:1000, max:6000})
    };
};

//create 100 records
var houseList = () => {
    var result = {
        features: [],
        interior: []
    };
    for(var i= 0; i < 100; i++){
        result.features.push(createFeatures());
        result.interior.push(createInterior());
    }
    return result;
};

module.exports = { houseList};

// function insertData (mockData){
//     var chunkSize = 100;
//     return knex.batchInsert('features', mockData.features, chunkSize)
//     .then(function(ids) { 
//         return;
//      })
//     .catch(function(error) { 
//         console.error(error);
//     });
// };

// generate 10 million
// var max = 100000;
// async function seedDatabase () {
//     var sw = new Stopwatch(true);
//     var mockData = houseList();
//     for(var i = 0; i < max; i++){
//         await insertData (mockData);
//     }
//     await console.log(`finished: ${sw.read()/60000} mins`);

//     var t0 = new Stopwatch(true);
//    await knex('features').where({house_id: 9999990}).select().then(data=>{
//        console.log(data);
//    });
//    var t1 = t0.read();
//    console.log("Execution time for using knex.selec\(\) to query 'houses' table in  MYSQL DB is  "+ (Number(t1)) + " milliseconds.");
//    return;
// };

// seedDatabase();
