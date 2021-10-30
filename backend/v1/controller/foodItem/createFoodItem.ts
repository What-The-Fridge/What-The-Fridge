export {};
const FoodItem = require('../../models/FoodItem');

// create a foodItem
async function createFoodItem(req: any, res: any) {
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
}

module.exports = createFoodItem;
