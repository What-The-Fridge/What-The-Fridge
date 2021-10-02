import express from 'express';
import db from '../db/database';
const postRoute = require('../routes/post');
const userRoute = require('../routes/user');
const foodItemRoute = require('../routes/foodItem');

require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// start the server
app.listen(port, () => {
	console.log('started');
});

// connect to DB
db.once('open', () => {
	console.log('MongoDB Database connected');
});

// use /post end point for all post requests
app.use('/post', postRoute);
app.use('/user', userRoute);
app.use('/foodItem', foodItemRoute);
