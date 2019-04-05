var faker = require('faker');
var Stopwatch = require('statman-stopwatch');
var db = require('./mongo_schema');

//set randomness seed
faker.seed(123);

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

var chunkSize = 1000;

const createMockData = () => {
    var result = {
        features: [],
        interior: []
    };
    for(var i= 0; i < chunkSize; i++){
        result.features.push(createFeatures());
        result.interior.push(createInterior());
    }
    return result;
}

const houseList = (id, mockData) => {
    var currentId = id * chunkSize;
    var result = { features: [], interior: [] };
    for(var i = 0; i < chunkSize; i++){
        var featureDoc = Object.assign( {'house_id': currentId+i}, mockData.features[i]);
        result.features.push(featureDoc);
        var interiorDoc = Object.assign( {'feature_id': currentId+i}, mockData.interior[i]);
        result.interior.push(interiorDoc);
    }
    return result;
};

//module.exports = houselist;

// generate 10 million
var max = 10000;

async function seedDatabase (cb) {
    var sw = new Stopwatch(true);
    var mockData = createMockData();
    for(var i = 0; i < max; i++){
        var idData = houseList(i, mockData);
         db.features.insertMany(idData.features, { ordered: false } )
        .then((res)=>{
        })
        .catch((err)=>{
            return cb(err, null);
        })
        await db.interior.insertMany(idData.interior, { ordered: false } )
        .then((res)=>{
        })
        .catch((err)=>{
            return cb(err, null);
        })
    }
    // var finished = `finished in ${sw.read()/60000} mins`;
    // await console.log(finished);

    var t0 = new Stopwatch(true);
    await db.interior.find({feature_id: 9999999})
    .then((items)=>{
        console.log('found:', items); //returns an array of a single object
    })
    .catch(err => console.error(`Failed to find document: ${err}`));
   var t1 = t0.read();  
   console.log("Execution time to query 'Interior' table in Mongo is  "+ (Number(t1)) + " milliseconds.");

//    return cb(null, finished);
   return cb(null, `finished in ${sw.read()/60000} mins`);
};

module.exports = {seedDatabase};
