export {};
const mongoose = require('mongoose');

const FoodItemSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
		default: '',
	},
	purchaseDate: {
		type: Number,
		default: new Date().getTime(),
	},
	expiryDate: {
		type: Number,
		require: true,
		default: new Date(
			new Date().setTime(new Date().getTime() + 2 * 86400000)
		).getTime(), // a week from creation
	},
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
