var db = require('./config.js');

module.exports = {
    development: {
        client: 'mysql',
        connection: db,
        migrations: {
            directory: __dirname+'knex/migrations'
        },
        seeds: {
            directory: __dirname+'knex/seeds'
        }
    }
};