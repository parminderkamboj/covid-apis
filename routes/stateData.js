var express = require('express');
var mysql = require('mysql');
//var config = require('../appconfig.json');
var router = express.Router();
//var dbConfig = config.db;
var connection = require('../connection');;
/* GET users listing. */
router.get('/', function (req, res, next) {
  connection.query('SELECT state, sum(confirmed) as confirmed, sum(deaths) as deaths, sum(recovered) as recovered from baseinfo where country = "US" group by state order by sum(confirmed) desc', function (error, results, fields) {
    if (error) {
      console.log(error);
      res
      res.status(500).jsonp(error);
    }
    if (results) res.status(200).jsonp(results);

  });

  //res.send('respond with a resource');
});

module.exports = router;
