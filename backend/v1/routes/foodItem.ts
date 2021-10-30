import express from 'express';
const router = express.Router();

// import functions from controller
const createFoodItem = require('../controller/foodItem/createFoodItem');
const getFoodItem = require('../controller/foodItem/getFoodItem');
const getFoodItemsByUser = require('../controller/foodItem/getFoodItemsByUser');
const getFoodItemsByStatus = require('../controller/foodItem/getFoodItemsByStatus');
const checkAuth = require('../controller/google/checkAuth');

// check authentication before every request
router.use(checkAuth);

// specify endpoints
router.post('/createFoodItem', createFoodItem);
router.get('/getFoodItem/:id', getFoodItem);
router.get('/:userId/getFoodItemsByUser', getFoodItemsByUser);
router.get('/:userId/getFoodItemsByStatus', getFoodItemsByStatus);

module.exports = router;
