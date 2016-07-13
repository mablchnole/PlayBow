var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));

// base url to show path resolved index.html
app.get('/', function(req, res){
  res.sendFile(path.resolve('client/views/index.html'));
});







// set up server
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('count your rainbows:', app.get('port'));
});
