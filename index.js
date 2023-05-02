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

app.get('/api', (req, res) => {
  let utcDate = new Date();
  res.send({unix: utcDate.getTime(), utc: utcDate.toUTCString()});
});

app.get('/api/:date', (req, res) => {
  let dateParam = req.params.date;
  console.log(new Date(dateParam));

  let date = dateParam.indexOf('-') === -1 && dateParam.indexOf(' ') === -1 ? 
    Number(dateParam) : dateParam;
  let utcDate = new Date(date);
  
  if(isNaN(utcDate.getTime()))
    res.send({error : utcDate.toUTCString()})
  else
    res.send({unix: utcDate.getTime(), utc: utcDate.toUTCString()}); 
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
