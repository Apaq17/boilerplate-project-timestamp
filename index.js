// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  let unix = 0;
  let utc = "";
  if (date.match(/\d{5,}/)) {
    unix = parseInt(date);
    utc = new Date(unix).toUTCString();
  } else if (date.match(/^\d{4}-\d{2}-\d{2}/)) {
    unix = Date.parse(date);
    utc = new Date(date).toUTCString();
  } else {
    unix = Date.parse(date);
    utc = new Date(date).toUTCString();
  }
  if (utc === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: unix, utc: utc });
  }
});

app.get("/api", function (req, res) {
  let date = new Date();
  let unix = date.getTime();
  let utc = date.toUTCString();
  res.json({ unix: unix, utc: utc });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
