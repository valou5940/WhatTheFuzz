const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const Api = require('./App/Apis/api');
const db = require('./App/Database/database');

const port = process.env.PORT || 5000;

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

app.use(express.static('../music-blog/public'));
app.use(express.static(path.join(`${__dirname}/public`)));

// database connection
db.connect();

// Api routes
Api.route(app);

// server listen
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
