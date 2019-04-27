var request = require('request');
var expect = require('chai').expect;


describe('Test Features CRUD API', function() {

  describe('test for GET', function(done) {

    it('should receive data on existent house id', (done) => {
      var expected = [{
        house_id: 9999990,
        type: 'Single Family',
        year_built: '2002',
        heating: 'Fan',
        cooling: 'Central',
        parking: 'None',
        lot: '80735',
        days_on_zillow: '81',
        price_per_sqft: null}];

      request.get({
        url: 'http://localhost:3001/house/features/9999990'
      }, function (error, response, body) {
        var result = JSON.parse(body);
        expect(response.statusCode).to.equal(200);
        expect(result).to.deep.equals(expected);
        done();
      });
    });

    it('should handle error on non-existent house id', (done) => {
      var expected = 'House 19999999 does not exist';

      request.get({
        url: 'http://localhost:3001/house/features/19999999'
      }, function (error, response, body) {
        expect(response.statusCode).to.equal(400);
        expect(body).to.equal(expected);
        done();
      });
    });
  });

  describe('test for POST', function(done) {
    
    it('should receive new houseId on successful insertion', (done) => {
      var newHouseEntry = {
        type: 'Single Family',
        year_built: '1990',
        heating: 'Fan',
        cooling: 'Central',
        parking: 'None',
        lot: '100500',
        days_on_zillow: '34',
        price_per_sqft: null
      };

      request.post({
        url: 'http://localhost:3001/house/features',
        form: newHouseEntry
      }, function (error, response, body) {
        var data = JSON.parse(body);
        var result = data.recent;
        expect(response.statusCode).to.equal(200);
        // expect(result).to.be(Number);??
        done();
      });
    });

    it('should handle error on incorrect house params', (done) => {
      var newHouseEntry = {
        type: 'Single Family',
        year_built: '1990',
        ac: 'cooling',
        parking: 'None',
        lot: '100500',
        days_on_zillow: '34',
        price_per_sqft: null
      };

      var expected = 'Unable to insert into features due to incorrect params';
      request.post({
        url: 'http://localhost:3001/house/features',
        form: newHouseEntry
      }, function (error, response, body) {
        expect(response.statusCode).to.equal(400);
        expect(body).to.equal(expected);
        done();
      });
    });

  });

  describe('test for DELETE', function(done) {
    it('should receive removed/last houseId on successful deletion', function(done) {
      var newHouseEntry = {
        type: 'Single Family',
        year_built: '1990',
        heating: 'Fan',
        cooling: 'Central',
        parking: 'None',
        lot: '100500',
        days_on_zillow: '34',
        price_per_sqft: null
      };

      request.post({
        url: 'http://localhost:3001/house/features',
        form: newHouseEntry
      }, function (error, response, body) {
        var lastId = JSON.parse(body).recent;
        var expected = `feature_${lastId} was successfully removed`;
        request.delete({
          url: `http://localhost:3001/house/features/${lastId}`,
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(body).to.equal(expected);
          done();
        });
      });

    });

    it('should handle error on non-existent house id', function(done) {
      var lastId = 'error';
      var expected = `feature_${lastId} does not exist, param error`;
      request.delete({
        url: `http://localhost:3001/house/features/${lastId}`,
      }, function (error, response, body) {
        expect(response.statusCode).to.equal(400);
        expect(body).to.equal(expected);
        done();
      });
    });
  });

  describe('test for PUT', function(done) {
    it('should receive message when id is successfully updated', function(done) {

      request.get({
        url: 'http://localhost:3001/house/features/999995'
      }, function (error, response, body) {
        var modify= JSON.parse(body);
        var modify= modify[0];
        var house_id = modify.house_id;
        modify.house_id = undefined;
        modify.year_built = '2000';
        var expected = `feature_${house_id} was successfully updated`;

        request.put({
          url: `http://localhost:3001/house/features/${house_id}`,
          form: modify
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(body).to.equal(expected);
          done();
        });
      });
    });

    it('should handle error when the data attributes are wrongly formatted', function(done) {
      var house_id = 20000000;
      var expected = `feature_${house_id} was not able to updated due to data format error`;
        request.put({
          url: `http://localhost:3001/house/features/${house_id}`,
          form: {year_built : '2000'}
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(400);
          expect(body).to.equal(expected);
          done();
        });
    });
  });

});

describe('Test Interior CRUD API', function() {
  
  describe('test for GET', function(done) {

    it('should receive data on existent house id', (done) => {
      var expected = [{ feature_id: 9999990,
        bedrooms: '5',
        bathrooms: '3',
        appliances: 'Refrigerator',
        kitchen: 'Eat In Kitchen',
        flooring: '1463',
        house_id: null,
        sqft: '1111' }];

      request.get({
        url: 'http://localhost:3001/house/interior/9999990'
      }, function (error, response, body) {
        var result = JSON.parse(body);
        expect(response.statusCode).to.equal(200);
        expect(result).to.deep.equals(expected);
        done();
      });
    });

    it('should handle error on non-existent house id', (done) => {
      var expected = 'House 19999999 does not exist';

      request.get({
        url: 'http://localhost:3001/house/interior/19999999'
      }, function (error, response, body) {
        expect(response.statusCode).to.equal(400);
        expect(body).to.equal(expected);
        done();
      });
    });
  });

  describe('test for POST', function(done) {
    
    it('should receive last/new houseId on successful insertion', (done) => {
      var newHouseEntry = {
        bedrooms: '5',
        bathrooms: '3',
        appliances: 'Refrigerator',
        kitchen: 'Eat In Kitchen',
        flooring: '1234',
        house_id: null,
        sqft: '6000' };

      request.post({
        url: 'http://localhost:3001/house/interior',
        form: newHouseEntry
      }, function (error, response, body) {
        var data = JSON.parse(body);
        var result = data.recent;
        expect(response.statusCode).to.equal(200);
        // expect(result).to.be(Number);??
        done();
      });
    });

    it('should handle error on incorrect house params', (done) => {
      var newHouseEntry = {
        bedrooms: '5',
        backyard: '800',
        appliances: 'Refrigerator',
        kitchen: 'Eat In Kitchen',
        flooring: '1234',
        house_id: null,
        sqft: '6000' };

      var expected = 'Unable to insert into interior due to incorrect params';
      request.post({
        url: 'http://localhost:3001/house/interior',
        form: newHouseEntry
      }, function (error, response, body) {
        expect(response.statusCode).to.equal(400);
        expect(body).to.equal(expected);
        done();
      });
    });

  });

  describe('test for DELETE', function(done) {
    it('should receive removed/last houseId on successful deletion', function(done) {
      var newHouseEntry = {
        bedrooms: '5',
        bathrooms: '3',
        appliances: 'Refrigerator',
        kitchen: 'Eat In Kitchen',
        flooring: '1463',
        house_id: null,
        sqft: '1000' };

      request.post({
        url: 'http://localhost:3001/house/interior',
        form: newHouseEntry
      }, function (error, response, body) {
        var lastId = JSON.parse(body).recent;
        var expected = `interior_${lastId} was successfully removed`;
        request.delete({
          url: `http://localhost:3001/house/interior/${lastId}`,
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(body).to.equal(expected);
          done();
        });
      });

    });

    it('should handle error on non-existent house id', function(done) {
      var lastId = 'error';
      var expected = `interior_${lastId} does not exist, param error`;
      request.delete({
        url: `http://localhost:3001/house/interior/${lastId}`,
      }, function (error, response, body) {
        expect(response.statusCode).to.equal(400);
        expect(body).to.equal(expected);
        done();
      });
    });
  });
  
  describe('test for PUT', function(done) {
    it('should receive message when id is successfully updated', function(done) {
      request.get({
        url: 'http://localhost:3001/house/interior/999995'
      }, function (error, response, body) {
        var modify= JSON.parse(body);
        var modify= modify[0];
        var house_id = modify.feature_id;
        modify.feature_id= undefined;
        modify.bedrooms = '5';
        modify.bathrooms =  '3';

        var expected = `interior_${house_id} was successfully updated`;

        request.put({
          url: `http://localhost:3001/house/interior/${house_id}`,
          form: modify
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(body).to.equal(expected);
          done();
        });
      });
    });

    it('should handle error when the data attributes are wrongly formatted', function(done) {
      var house_id = 200000;
      var expected = `interior_${house_id} was not able to updated due to data format error`;
        request.put({
          url: `http://localhost:3001/house/interior/${house_id}`,
          form: {bedroom : '2'}
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(400);
          expect(body).to.equal(expected);
          done();
        });
    });

    it('should handle error on non-existent house id', function(done) {
      var house_id = 20000000;
      var expected = `interior_${house_id} was not able to updated due to non-existent id`;
        request.put({
          url: `http://localhost:3001/house/interior/${house_id}`,
          form: {bedrooms : '2'}
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(400);
          expect(body).to.equal(expected);
          done();
        });
    });
  });
});