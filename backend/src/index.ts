import express from 'express';
import db from '../db/database'
const postsRoute = require('../routes/posts');
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
    console.log("started");
})

// connect to DB
db.once('open', () => {
    console.log("MongoDB Database connected")
})

// use /posts end point for all posts requests
app.use('/posts', postsRoute);

