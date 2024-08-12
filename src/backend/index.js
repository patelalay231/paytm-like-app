//importing required libraries
const express = require('express');
const mongoose = require("mongoose");
const cors =require("cors");
const cookieParser = require('cookie-parser')
const {errorHandler} = require("./error-handler");

//settings
const app = express();
const PORT = process.env.PORT || 8000;

//routes
const userRoute = require("./routes/user.routes");
const accountRoute = require("./routes/account.routes");
const { checkForAuthenticationCookie } = require('./middlewares/auth.middleware');

// connecting database
const uri = 'mongodb+srv://alay231:alay231@paytmcluster01.dglrs.mongodb.net/?retryWrites=true&w=majority&appName=PaytmCluster01';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas cluster'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

// setting up routes
app.use('/api/v1/user',userRoute);
app.use('/api/v1/account',accountRoute);

app.use(errorHandler);
app.listen(PORT);