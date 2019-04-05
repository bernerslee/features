var mockData = require('../../mysql/mysql_data');
var Stopwatch = require('statman-stopwatch');
//seeds mysql database
exports.seed = function(knex, Promise) {
  
  async function seedDataBase(data, cb) {
    var max = 10000;
    var chunkSize = 1000;
    var sw = new Stopwatch(true);
    for(var i = 0; i < max; i++){
        //insert facts data
        knex.batchInsert('features', data.features, chunkSize)
        .then(function(ids) {
         })
        .catch(function(error) { 
            return cb(error, null)
        });
        //insert interior data
        await knex.batchInsert('interior_features', data.interior, chunkSize)
        .then(function(ids) {
         })
        .catch(function(error) { 
            return cb(error, null)
        });
    }
    return cb(null, `finished: ${sw.read()/60000} mins`);
  }

  function seedPromise() {
    return new Promise(function (resolve, reject) {
      var data = mockData.houseList();
        seedDataBase(data, function (err, result) {
          if (err) {
              reject(err);
          } else {
              resolve(JSON.stringify(result));
          }
        });
    });
  }
  
  //before seeding database clear all tables
  return Promise.all([
    knex('features').del(),
    knex('interior_features').del(),
    seedPromise().then((res)=>{
      console.log(res);
    })
  ]);
};