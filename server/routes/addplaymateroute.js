var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');

var connection = require('../modules/connection');

// post route to add new playmate
router.post('/addPlaymate', function(req, res){
  console.log('in addPlaymate server post route', req.body.name);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      var sendPlaymate = client.query('INSERT INTO playmates (name, breed, age, gender) VALUES ($1, $2, $3, $4)',
        [req.body.name, req.body.breed, req.body.age, req.body.gender]);
      sendTask.on('end', function(){
        return res.end();
      });
    }
    done();
  });
});

module.exports = router;
