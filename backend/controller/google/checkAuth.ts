export {};
var mongoose = require('mongoose');
const Session = require('../../models/Session');

// Check authentication middleware
async function checkAuth(req: any, res: any, next: any) {
	const findSession = await Session.findOne({
		_id: req.headers.sid,
	});

	// if session exists && !expired, proceed to the next request
	// otherwise, end the request
	if (findSession) {
		console.log('this request is authorized');
		next();
	} else {
		req.pause();
		res.status(401).end('not logged in!');
	}
}

module.exports = checkAuth;
