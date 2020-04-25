var express = require('express');
var mysql = require('mysql');
//var config = require('../appconfig.json');
var router = express.Router();
//var dbConfig = config.db;
var connection = require('../connection');;
/* GET users listing. */
router.post('/', function (req, res, next) {
  lat = req.body.lat;
  lng = req.body.lng;
  targetLoc = {
    latitude:lat,
    longitude:lng
  };
  console.log(targetLoc);
  connection.query('SELECT * from baseinfo where country = "US" and county is not null and county != ""', function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    if (results) {
      result = closestLocation(targetLoc, results);
      res.send(result);
    }
    // connected!
    //connection.release();
  });

  //res.send('respond with a resource');
});
function closestLocation(targetLocation, locationData) {
    function vectorDistance(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy);
    }

    function locationDistance(location1, location2) {
        var dx = location1.latitude - location2.latitude,
            dy = location1.longitude - location2.longitude;

        return vectorDistance(dx, dy);
    }

    return locationData.reduce(function (prev, curr) {
        var prevDistance = locationDistance(targetLocation, prev),
            currDistance = locationDistance(targetLocation, curr);
        return (prevDistance < currDistance) ? prev : curr;
    });
}
module.exports = router;
