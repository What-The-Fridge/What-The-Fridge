export {};
const mongoose = require('mongoose');
const GenderType = require('./types/gender');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
		default: '',
	},
	gender: {
		type: String,
		enum: Object.values(GenderType),
		default: GenderType.Undeclared,
	},
	phoneNum: {
		type: Number,
		default: 0,
	},
	email: {
		type: String,
		default: '',
	},
});

module.exports = mongoose.model('User', UserSchema);
