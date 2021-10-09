import express from 'express';
const router = express.Router();
const User = require('../models/User');

// import functions from controller
const byEmailOrPhone = require('../controller/user/byEmailOrPhone');
const createUser = require('../controller/user/createUser');
const deleteUser = require('../controller/user/deleteUser');

// specify endpoints
router.get('/byEmailOrPhone', byEmailOrPhone);
router.post('/createUser', createUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
