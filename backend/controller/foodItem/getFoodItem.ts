export {};
const FoodItem = require('../../models/FoodItem');

// get a food Item with a certain Id
async function getFoodItem(req: any, res: any) {
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
}

module.exports = getFoodItem;
