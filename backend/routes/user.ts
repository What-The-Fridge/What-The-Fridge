import express from 'express';
const router = express.Router();
const User = require('../models/User');

const byEmailOrPhone = require('../controller/user/byEmailOrPhone');
const createUser = require('../controller/user/createUser');
const deleteUser = require('../controller/user/deleteUser');

router.get('/byEmailOrPhone', byEmailOrPhone);
router.post('/createUser', createUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
