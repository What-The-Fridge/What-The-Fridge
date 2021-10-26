export {};
const User = require('../../models/User');

// Check authentication middleware
async function checkAuth(req: any, res: any, next: any) {
	const user = await User.findOne({ id: req.session.userId });
	// req.user = user;
	console.log(req.headers.sid);
	console.log('check Auth');
	next();
}

module.exports = checkAuth;
