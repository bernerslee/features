var mongoose = require('mongoose');
var Promise = require("bluebird");
var data = require('./mongo_data');
var mongoDB = require('./mongo_schema');

let mongoURI = 'mongodb://localhost/sampling';
mongoose.set('useCreateIndex', true);

async function mongoSeed() {
    await mongoose.connect(mongoURI, {useNewUrlParser: true})
        .then((db) => {
            console.log(`Connected to: ${mongoURI}`);
        })
        .catch(err => {
            console.log(`There was a problem connecting to mongo at: ${mongoURI}`)
            console.log(err);
        });
    await mongoDB.features.deleteMany({});
    await mongoDB.interior.deleteMany({});
    await seedPromise().then((res)=>{
              console.log('final: ',res);
            });
    await mongoose.connection.close();
}

function seedPromise(){
    return new Promise((resolve, reject) => {
        data.seedDatabase((err, result) => {
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

mongoSeed();