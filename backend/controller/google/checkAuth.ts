export {};
const User = require('../../models/User');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SessionSchema = new Schema({ _id: String }, { strict: false });
const Session = mongoose.model('sessions', SessionSchema, 'sessions');

// Check authentication middleware
async function checkAuth(req: any, res: any, next: any) {
	const findSession = await Session.findOne({
		_id: req.headers.sid,
	});
	console.log(findSession);
	if (findSession) {
		console.log('Logged in!');
	} else {
		console.log('Not logged in');
	}

	res.send('lol');
}

module.exports = checkAuth;
