import express from 'express';
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// create a foodItem
router.post('/createFoodItem', async (req: any, res: any) => {
	try {
		if (!req.body.name || !req.body.expiryDate || !req.body.user)
			return res.status(400).send('bad input');

		const createFoodItem = await new FoodItem({
			name: req.body.name,
			user: req.body.user,
			purchaseDate: req.body.purchaseDate,
			expiryDate: req.body.expiryDate,
		}).save();

		if (createFoodItem) {
			return res.status(200).json(createFoodItem);
		} else {
			return res.status(204).json('error creating foodItem');
		}
	} catch (err: any) {
		return res.status(404).json(err);
	}
});

// get a food Item with a certain Id
router.get('/getFoodItem/:id', async (req: any, res: any) => {
	try {
		if (!req.params.id) return res.status(400).send('bad input');

		const getFoodItem = await FoodItem.findOne({ _id: req.params.id });

		if (getFoodItem) {
			return res.status(200).json(getFoodItem);
		} else {
			return res.status(204).send('error while getting the foodItem');
		}
	} catch (err: any) {
		return res.status(404).json(err);
	}
});

// get all food items of a user
router.get('/getFoodItemsByUser/:id', async (req: any, res: any) => {
	try {
		if (!req.params.id) return res.status(400).send('bad input');

		const getFoodItemsByUser = await FoodItem.find({ user: req.params.id });

		if (getFoodItemsByUser) {
			return res.status(200).json(getFoodItemsByUser);
		} else {
			return res.status(204).send('error while getting the foodItems');
		}
	} catch (err: any) {
		return res.status(404).json(err);
	}
});

module.exports = router;
