export {};
const mongoose = require('mongoose');
const GroceryStatusType = require('./types/GroceryStatus');

const GroceryItemSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
		default: '',
	},
	user: {
		type: mongoose.Types.ObjectId,
		require: true.valueOf,
		ref: 'User',
	},
	GroceryStatus: {
		type: String,
		enum: Object.values(GroceryStatusType),
		default: GroceryStatusType.Undeclared,
	},
});

module.exports = mongoose.model('GroceryItem', GroceryItemSchema);
