// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.end('Please put in your date, or UNIX timestamp');
  //response.sendFile(__dirname + '/views/index.html');
});

app.get('/:time', function (request, response) {
  var time = request.params.time;
  console.log('Eingabe: ' + time);
  var result = { "unix": null, "natural": null };
  
  var months = {
    'Jan': 'January',
    'Feb': 'February',
    'Mar': 'March',
    'Apr': 'April',
    'May': 'May',
    'Jun': 'June',
    'Jul': 'July',
    'Aug': 'August',
    'Sept': 'September',
    'Okt': 'Oktober',
    'Nov': 'November',
    'Dec': 'December',
  };
  
  if( Number.isInteger( Number.parseInt(time) ) ) {
    result.unix = Number.parseInt(time);
    result.natural = getNaturalDate( Number.parseInt(time) );
  }
  else if( Date.parse(time) !== NaN ) {
    result.unix = Date.parse(time);
    result.natural = getNaturalDate( Date.parse(time) );
  }
  
  
  function getNaturalDate(unix) {
    var eventArr = new Date(unix).toString().split(' ');
    return `${months[ eventArr[1] ]} ${eventArr[2]}, ${eventArr[3]}`;
  }
  
  response.json(result);
  response.end();
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  //console.log('Your app is listening on port ' + listener.address().port);
});
