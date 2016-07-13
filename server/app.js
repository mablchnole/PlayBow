var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));

// base url to show path resolved index.html
app.get('/', function(req, res){
  console.log('bow wow at basecamp');
  res.sendFile(path.resolve('client/views/index.html'));
});

// include routes
var addplaymate = require('./routes/addplaymateroute');






// set up server
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('human, are you awake:', app.get('port'));
});
