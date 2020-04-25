var config = require('./appconfig.json');
var mysql = require('mysql');
var dbConfig = config.db;
var connection = mysql.createConnection(dbConfig);
module.exports = connection;
