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
	picture: {
		type: String,
		default:
			'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
	},
});

module.exports = mongoose.model('User', UserSchema);
