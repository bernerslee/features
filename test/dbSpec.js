const mysql = require('mysql');
const db = require('../database/index');
const expect = require('chai').expect
const chaiHttp = require('chai-http');
const server = require('../server/server');
const config = require('../test/config');