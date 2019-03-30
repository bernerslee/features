var faker = require('faker');
var Stopwatch = require('statman-stopwatch');
var db = require('./mongo_schema');

//set randomness seed
faker.seed(123);
var chunkSize = 10;

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
var houseList = (id, mockData) => {
    var currentId = id * chunkSize;
    var result = {
        features: [],
        interior: []
    };
    for(var i = 0; i < chunkSize; i++){
        result.features.push(Object.assign( {'house_id': currentId+i}, {info: mockData.features[i]} ));
        result.interior.push(Object.assign( {'house_id': currentId+i}, {info: mockData.interior[i]} ));
    }
    console.log('result: ',result); //<<<<<
    return result;
};

function insertData (mockData){
    db.features.insertMany(mockData.features,{ordered: false});
};

// generate 10 million
// var max = 100000;
var max = 1;

async function seedDatabase () {
    var sw = new Stopwatch(true);
    var mockData = createMockData();
    for(var i = 0; i < max; i++){
        await insertData (houseList(i,mockData));
    }
    await console.log(`finished: ${sw.read()/60000} mins`);

    var t0 = new Stopwatch(true);
    await db.features.findOne({house_id: 3});
   var t1 = t0.read();
   console.log("Execution time to query 'Interior' table in Mongo is  "+ (Number(t1)) + " milliseconds.");

   return;
};

seedDatabase();