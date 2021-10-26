import express from 'express';
import db from '../db/database';
import expressSession from 'express-session';
const cookieParser = require('cookie-parser');
const postRoute = require('../routes/post');
const userRoute = require('../routes/user');
const foodItemRoute = require('../routes/foodItem');
const googleRoute = require('../routes/google');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 3001;

const app = express();

// CORS policy
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With, content-type, sid'
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', 'true');

	// Pass to next layer of middleware
	next();
});

// allow the use of session
const oneDay = 1000 * 60 * 60 * 24;
app.use(
	expressSession({
		secret: process.env.SESSION_SECRET_KEY!, // '!' ensure ts that we will provide the key
		saveUninitialized: true,
		cookie: { maxAge: oneDay },
		resave: false,
	})
);

// cookie parser middleware
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// start the server
app.listen(port, () => {
	console.log(`started on ${port}`);
});

// connect to DB
db.once('open', () => {
	console.log('MongoDB Database connected');
});

console.log(
	new Date(new Date().setTime(new Date().getTime() + 2 * 86400000)).getTime()
); // a week from creation);

// use /post end point for all post requests
app.use('/post', postRoute);
app.use('/user', userRoute);
app.use('/foodItem', foodItemRoute);
app.use('/google', googleRoute);
