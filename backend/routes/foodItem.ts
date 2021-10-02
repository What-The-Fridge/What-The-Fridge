import express from 'express';
const router = express.Router();
const FoodItem = require('../models/FoodItem');

router.post('/createFoodItem', async (req: any, res: any) => {
	try {
		if (!req.body.name || !req.body.expiryDate)
			return res.status(400).send('bad input');

		const createFoodItem = await new FoodItem({
			name: req.body.name,
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

module.exports = router;
