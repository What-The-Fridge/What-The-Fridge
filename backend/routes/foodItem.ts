import express from 'express';
const router = express.Router();
const FoodItem = require('../models/FoodItem');

router.post('/createFoodItem', async (req: any, res: any) => {
	try {
		if (!res.body.name || !res.body.expiryDate)
			return res.status(400).send('bad input');

		const createFoodItem = await new FoodItem({
			name: res.body.name,
		});
	} catch (err: any) {
		return res.status(404).json(err);
	}
});
