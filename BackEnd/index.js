// require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

// controllers
const authenticatectrl = require('./controllers/authctrl');
const fanctrl = require('./controllers/fanctrl');
const lightctrl = require('./controllers/lightctrl');
const meterctrl = require('./controllers/meterctrl');
const simulatedlightctrl = require('./controllers/simulatedlightctrl');
const simulatedmeterctrl = require('./controllers/simulatedmeterctrl');
const simulatedfanctrl = require('./controllers/simulatedfanctrl');


//const testredis = require("./controllers/redis")

var cors = require('cors');
const jwt = require('jsonwebtoken');
const responseTime = require('response-time');
const redis = require('redis');
const axios = require('axios');

const InitiateMongoServer = require('./config/mongo/mongodb');
InitiateMongoServer();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(responseTime());

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage });
app.use(express.static(__dirname + '/public'));


app.use('/uploads', express.static('uploads'));



app.use('/api/auth', authenticatectrl);
app.use('/api/fan', fanctrl);
app.use('/api/light', lightctrl);
app.use('/api/meter', meterctrl);
app.use('/api/simulatedlight', simulatedlightctrl);
app.use('/api/simulatedmeter', simulatedmeterctrl);
app.use('/api/simulatedfan', simulatedfanctrl);


app.get("/", (req, res) => {
  res.send("Hello, backend is running!");
})

// server listening
app.listen(process.env.PORT || 4001, function () {
  console.log(
    'Express server listening on port %d in %s mode ',
    this.address().port,
    app.settings.env
  );

});

module.exports = app;
