const redis = require('redis');
const {promisify} = require('util');
const redisPort = require('../config').redisPort;
const redisHost = require('../config').redisHost;
var client = redis.createClient(redisPort, redisHost);

client.on('connect', function() {
    console.log('Redis client connected');
});

module.exports = {
  client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client)
};