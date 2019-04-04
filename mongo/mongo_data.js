var faker = require('faker');
var Stopwatch = require('statman-stopwatch');
var db = require('./mongo_schema');

//set randomness seed
faker.seed(123);
var chunkSize = 10;

/** Generate Data **/
const createFeatures = () => {
    return {
        type: faker.random.arrayElement(['Single Family', 'Multifamily', 'Condo', 'Townhome']),
        year_built: faker.random.number({min:1900, max:2006}),
        heating: faker.random.arrayElement(['Forced air', 'Fan', 'Speeder air']),
        cooling: faker.random.arrayElement(['None', 'A/C', 'Central']),
        parking: faker.random.arrayElement(['None', '1 Space', '2 Spaces', '3 Spaces']),
        lot: faker.random.number({min: 1000, max:100000}),
        days_on_zillow: faker.random.number({min: 1, max:100}),
        price_per_sqft: ''
    };
};

const createInterior = () =>{
    return {
        bedrooms: faker.random.number({min:1, max:6}),
        bathrooms: faker.random.number({min:1, max:5}),
        appliances: faker.random.arrayElement(['Dishwasher','Dryer', 'Garbage disposal', 'Refrigerator', 'Washer']),
        kitchen: faker.random.arrayElement(['Counter', 'Pantry', 'Updated Kitchen', 'Eat In Kitchen']),
        flooring: faker.random.number({min:100, max:2000}),
        sqft: faker.random.number({min:1000, max:6000})
    };
};

const createMockData = () => {
    var result = {
        features: [],
        interior: []
    };
    for(var i= 0; i < 100; i++){
        result.features.push(createFeatures());
        result.interior.push(createInterior());
    }
    return result;
}


//create 100 records - return array of objects
const houseList = (id, mockData) => {
    var currentId = id * chunkSize;
    var result = {
        features: [],
        interior: []
    };
    for(var i = 0; i < chunkSize; i++){
        var featureDoc = Object.assign( {'house_id': currentId+i}, mockData.features[i]);
        result.features.push(featureDoc);
    }
    return result;
};

function insertData (mockData, cb){
    return db.features.insertMany(mockData.features, { ordered: false } )
    .then((res)=>{
        // console.log('result: ',res.length);
        return;
    })
    .catch((err)=>{
        return cb(err, null);
    })
};

// generate 10 million
// var max = 100000;
var max = 1;

async function seedDatabase (cb) {
    var sw = new Stopwatch(true);
    var mockData = createMockData();
    for(var i = 0; i < max; i++){
        await insertData (houseList(i, mockData), cb);
    }
    var finished = `finished in ${sw.read()/60000} mins`
    // await console.log(finished);

//     var t0 = new Stopwatch(true);
//     await db.features.find({house_id: 2})
//     .then((items)=>{
//         console.log('found:', items); //returns an array of a single object
//     })
//     .catch(err => console.error(`Failed to find document: ${err}`));
//    var t1 = t0.read();
//    console.log("Execution time to query 'Interior' table in Mongo is  "+ (Number(t1)) + " milliseconds.");

   return cb(null, finished);
};

module.exports = {seedDatabase};
