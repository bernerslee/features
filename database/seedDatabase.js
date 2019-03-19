const mock = require('./createMockData');
const db = require('./index');

async function seedDatabase () {
  await  db.loadFeatures((err)=> {
    if (err) {
      throw err;
    }
  });

  await db.loadInterior((err)=> {
    if (err) {
      throw err;
    }
  });
    
  await db.db.end();
}

seedDatabase(); 

