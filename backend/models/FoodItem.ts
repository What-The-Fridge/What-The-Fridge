export {};
const mongoose = require('mongoose');

const FoodItem = mongoose.Schema({
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
		default: new Date().getTime() + 86400000, // a week from the creation date
	},
});

module.exports = mongoose.model('FoodItem', FoodItem);

// new Date(
//     new Date().setTime(new Date().getTime() + 2 * 86400000),
//   ).getTime(), // two weeks from creation
