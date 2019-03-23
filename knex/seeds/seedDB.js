var mockData = require('../../db/mysql');
var Stopwatch = require('statman-stopwatch');

exports.seed = function(knex, Promise) {
  
  async function seedDataBase(data, cb) {
    var max = 100000;
    var chunkSize = 100;
    var sw = new Stopwatch(true);
    for(var i = 0; i < max; i++){
        await knex.batchInsert('features', data.features, chunkSize)
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
    seedPromise().then((res)=>{
      console.log(res);
    })
  ]);
};