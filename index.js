const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const cookieSession = require("cookie-session");
const mongoose = require("mongoose")
const Api = require('./Routes/api');
// const post_Api = require('./routes/post_Api')
const app = express({limit :"50mb"});
mongoose.set('strictQuery', true);
// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: true , parameterLimit: 50000}));
app.use(bodyParser.json());
// simple route
app.use('/api', Api)
// app.use('hostApi', post_Api)
const url = "mongodb://127.0.0.1:27017/HSFdb"
mongoose.connect(url).then((ans) => {
    console.log("ConnectedSuccessful")
  }).catch((err) => {
    console.log(err)
  })


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

