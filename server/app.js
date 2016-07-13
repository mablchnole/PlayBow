var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// set client directory as static
app.use(express.static('client'));

// middleware
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// include routes
var addPlaymate = require('./routes/addPlaymate');

// use routes
app.use('/', addPlaymate);


// base url to show path resolved index.html
app.get('/', function(req, res){
  console.log('bow wow at basecamp');
  res.sendFile(path.resolve('client/views/index.html'));
});

// set up server
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('human, are you awake:', app.get('port'));
});
