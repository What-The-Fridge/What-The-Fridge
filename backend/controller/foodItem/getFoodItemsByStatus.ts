export {};
const FoodItem = require('../../models/FoodItem');

// get expired or unexpired items of a user
async function getFoodItemsByStatus(req: any, res: any) {
	try {
		if (!req.params.userId) return res.status(400).send('bad input');

		if (!(req.query.status == 'expired' || req.query.status == 'unexpired'))
			return res
				.status(400)
				.send('please specify the expiry status of the food');

		const getFoodItemsByUser = await FoodItem.find({ user: req.params.userId });

		const getTodayDate = new Date().getTime();
		let expiredFoodItem: any[] = [];

		if (getFoodItemsByUser) {
			if (req.query.status == 'expired') {
				getFoodItemsByUser.forEach((element: any) => {
					if (element.expiryDate < getTodayDate) {
						expiredFoodItem.push(element);
					}
				});
			}
			if (req.query.status == 'unexpired') {
				getFoodItemsByUser.forEach((element: any) => {
					if (element.expiryDate >= getTodayDate) {
						expiredFoodItem.push(element);
					}
				});
			}
			return res.status(200).json(expiredFoodItem);
		} else {
			return res.status(204).json('error while getting the expired foodItems');
		}
	} catch (err: any) {
		return res.status(404).json(err);
	}
}

module.exports = getFoodItemsByStatus;
