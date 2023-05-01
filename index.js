require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use((req,res,next) => {
  console.log(`${req.method}`);
  next();
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/([0-9]{4}-[0-1]{1}[0-9]{1}-[0-1]{1}[0-9]{1})', (req, res) => { 
  let route = req.path;
  let routeDate = '';
  for(let i = 5; i < route.length; i++)
  {
    routeDate += route[i]
  }
  let arrRouteDate = routeDate.split('-');
  let arrDataNumber = [];
  arrRouteDate.forEach((el) => {
    if(el[0] === '0') return arrDataNumber.push(Number(el[1]));
    return arrDataNumber.push(Number(el));
  });
  console.log(arrDataNumber);
  arrDataNumber[1]--;
  let utcData = new Date(Date.UTC(...arrDataNumber));
  let unixData = utcData.getTime()
  res.json({unix: unixData, utc: utcData.toUTCString()});
});


app.get('/api/([0-9]{1,})', (req, res) => {
  let routeDate = '';
  let route = req.path;
  for(let i = 5; i < route.length; i++)
  {
    routeDate += route[i]
  }
  let unixData = Number(routeDate);
  let utcData = new Date(unixData);
  res.json({unix: routeDate, utc: utcData});
});

app.get('/api/(.{1,})', (req, res) => {
  res.json({error: 'Invalid Date'});
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
