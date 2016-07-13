var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../modules/connection');

////////////////////////////////////////////////////////////
//             ROUTES TO ADD NEW PLAYMATE                 //
////////////////////////////////////////////////////////////

// post route to insert new playmate into the database
router.post('/addPlaymate', function (req, res){
  console.log('in addPlaymate server post route, run:', req.body.name);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      var sendPlaymate = client.query('INSERT INTO playmates (name, breed, age, gender, sterile, vaccinated) VALUES ($1, $2, $3, $4, $5, $6)',
        [req.body.name, req.body.breed, req.body.age, req.body.gender, req.body.sterile, req.body.vaccinated]);
      sendPlaymate.on('end', function(){
        return res.end();
      });
    }
    done();
  });
}); // end addPlaymate route

// get route to retrieve all playmates from the database
router.get('/getPlaymates', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var callDatabase = client.query('SELECT * FROM playmates;');
    // push each row in query into our results array
    callDatabase.on('row', function(row) {
      results.push(row);
    }); // end query push
    callDatabase.on('end', function(){
      console.log('who let the dogs out?!', results);
      return res.json(results);
    });
    if(err) {
      console.log(err);
    }
  }); // end pg connect
}); // end getPlaymates route

////////////////////////////////////////////////////////////
//               ROUTES TO ADD TO FAVES                   //
////////////////////////////////////////////////////////////

// post route to insert fave into the database
router.post('/addFave', function (req, res){
  console.log('in addFave server post route, run:', req.body.name);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      var sendFave = client.query('INSERT INTO favorites (name, breed, age, gender, sterile, vaccinated) VALUES ($1, $2, $3, $4, $5, $6)',
        [req.body.name, req.body.breed, req.body.age, req.body.gender, req.body.sterile, req.body.vaccinated]);
      sendFave.on('end', function(){
        return res.end();
      });
    }
    done();
  });
}); // end addFave route

// get route to retrieve all faves from the database
router.get('/getFaves', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var callDatabase = client.query('SELECT * FROM favorites;');
    // push each row in query into our results array
    callDatabase.on('row', function(row) {
      results.push(row);
    }); // end query push
    callDatabase.on('end', function(){
      console.log('who let the faves out?!', results);
      return res.json(results);
    });
    if(err) {
      console.log(err);
    }
  }); // end pg connect
}); // end getFaves route


module.exports = router;
