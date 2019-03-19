var faker = require('faker');

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
        Cooling: faker.random.arrayElement(['None', 'A/C', 'Central']),
        Heating: faker.random.arrayElement(['Forced air', 'Fan', 'Speeder air']),
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

//using knex we can create multiple transactions

//helper function - create transaction
    //will make 100 queries

    //possible error--> when inserting them, will id 
    //conflict with other trxs queries if so, maybe pass in predefined id?

//generate 10 million
    //for loop to itterate over 100,000

