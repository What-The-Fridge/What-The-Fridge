import { userInfo } from 'os';

export {};
const GroceryItem = require('../../models/GroceryItem');

async function createGroceryItem(req: any, res: any) {
	try {
		if (!req.body.name || !req.body.user || req.body.groceryStatus)
			return res.status(400);
		var createGroceryItem = await new GroceryItem({
			name: req.body.name,
			user: req.body.user,
			groceryStatus: req.body.groceryStatus,
		}).save();

		if (createGroceryItem) {
			res.status(200).json(createGroceryItem);
		} else {
			res.status(204).send('error saving create GroceryItem');
		}
	} catch (err: any) {
		return res.status(404).json(err);
	}
}
