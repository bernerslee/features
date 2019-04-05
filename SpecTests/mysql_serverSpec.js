var request = require('request');
var expect = require('chai').expect;
var should = require('chai').should();
var config = require('../config');
const knex = require('../knex/knex.js');


describe('Test Features CRUD API', function() {

  describe('test for GET', function() {
    var expected = {};
    //create request
    it('should return an array of length 1 when id exists', function() {
      expect(result.length).to.equal(1);
    });
    it('should return an array with an object that equals to expected', function() {
      
    });
    it('should return a string message error when id does not exist', function() {
      expect(result).to.be.a('string');
    });
  });
  describe('test for POST', function() {
    var expected = {};
    //create request
    it('should return a string message when id is successfully posted', function() {
      expect(result).to.be.a('string');
    });
    it('should return a string message error when the id is not inserted into database', function() {
      expect(result).to.be.a('string');
    });
  });
  describe('test for DELETE', function() {
    var expected = {};
    //create request
    it('should return a string message when id is successfully removed', function() {
      expect(result).to.be.a('string');
    });
    it('should return a string message error when the id is unable to be removed', function() {
      expect(result).to.be.a('string');
    });
  });
  describe('test for PUT', function() {
    var expected = {};
    //create request
    it('should return a string message when id is successfully removed', function() {
      expect(result).to.be.a('string');
    });
    it('should return a string message error when the id is unable to be removed', function() {
      expect(result).to.be.a('string');
    });
  });

  after(()=> {
    dbConnect.end();
  })

});

describe('Test Interior CRUD API', function() {
    describe('test for GET', function() {
        var expected = {};
        //check length
        //check result with expected
        //should return an array with one object
      it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
    describe('test for POST', function() {
      var expected = {};
      //check length
      //check result with expected
      //should return an array with one object
      it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
    describe('test for DELETE', function() {
      var expected = {};
      //check length
      //check result with expected
      //should return an array with one object
      it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
    describe('test for PUT', function() {
      var expected = {};
      //check length
      //check result with expected
      //should return an array with one object
     it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });