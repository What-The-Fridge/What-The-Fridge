export {};
const FoodItem = require('../../models/FoodItem');

// get all food items of a user
async function getFoodItemsByUser(req: any, res: any) {
	try {
		if (!req.params.userId) return res.status(400).send('bad input');

		const getFoodItemsByUser = await FoodItem.find({ user: req.params.userId });

		if (getFoodItemsByUser) {
			return res.status(200).json(getFoodItemsByUser);
		} else {
			return res.status(204).send('error while getting the foodItems');
		}
	} catch (err: any) {
		return res.status(404).json(err);
	}
}

module.exports = getFoodItemsByUser;
