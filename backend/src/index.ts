import express from 'express';
import db from '../db/database';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
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
const timePersistence = 1000 * 30; // 1 second * 60
app.set('trust proxy', 1); // trust first proxy
app.use(
	expressSession({
		secret: process.env.SESSION_SECRET_KEY!, // '!' ensure ts that we will provide the key
		saveUninitialized: true,
		cookie: {
			secure: process.env.NODE_ENV == 'production' ? true : false,
			maxAge: timePersistence,
		},
		resave: false,
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URL, //YOUR MONGODB URL
			ttl: 1 * 24 * 60 * 60, // time to live = 1 day
			autoRemove: 'native', // remove expired sessions
		}),
	})
);

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

// use /post end point for all post requests
app.use('/post', postRoute);
app.use('/user', userRoute);
app.use('/foodItem', foodItemRoute);
app.use('/google', googleRoute);
