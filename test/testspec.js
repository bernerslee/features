const mysql = require('mysql');
const db = require('../database/index');
const expect = require('chai').expect
const chaiHttp = require('chai-http');
const server = require('../server/server');
const config = require('../test/config');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zillow'
});



describe('Testing Database', () => {

  it('should have the correct data', function (){
    connection.query('SELECT * from features limit 2', (err, results) => {
      expect(results[0].id).to.equal(13);
      expect(results[0].type).to.be.a('string');
    });
    
  });

  it("should have 100 records in the interior_features table", function () {
    connection.query('SELECT * from interior_features', (err, results) => {
      console.log(results)
        expect(results).to.equal(100);
        done();
    });
  });

  it("should have 100 records in the features table", function () {
    connection.query('SELECT * from features', (err, results) => {
      console.log(results)
        expect(results).to.equal(100);
        done();
    });
  })

});