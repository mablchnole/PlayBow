var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../modules/connection');

////////////////////////////////////////////////////////////
//       ROUTE TO RETRIEVE NEWEST PLAYMATE PROFILE        //
////////////////////////////////////////////////////////////

router.get('/getNewest', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var callDatabase = client.query('SELECT * FROM playmates ORDER BY created DESC LIMIT 1;');
    // push each row in query into our results array
    callDatabase.on('row', function(row) {
      results.push(row);
    }); // end query push
    callDatabase.on('end', function(){
      console.log('newest created playmate back from the database:', results);
      return res.json(results);
    });
    if(err) {
      console.log(err);
    }
  }); // end pg connect
}); // end getProfile route

////////////////////////////////////////////////////////////
//               ROUTE TO MATCH PLAYSTYLES                //
////////////////////////////////////////////////////////////

// post route to insert fave into the database
router.post('/sendPlaystyles', function (req, res){
  console.log('in sendPlaystyles post route, run:', req.body.playstyles);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      // not sure how to query
      var matchPlaystyles = client.query('SELECT * FROM favorites WHERE (playstyles) = VALUES ($1)',
        [req.body.playstyles]);

      matchPlaystyles.on('end', function() {
        return res.end();
      });
    }
    done();
  });
}); // end addFave route

module.exports = router;
