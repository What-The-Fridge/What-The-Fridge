export {};
const User = require('../../models/User');

//create a user
async function createUser(req: any, res: any) {
	try {
		if (!req.body.name) return res.status(400).send('bad input');

		const createUser = await new User({
			name: req.body.name,
			gender: req.body.gender,
			phoneNum: req.body.phoneNum,
			email: req.body.email,
		}).save();

		if (createUser) {
			return res.status(200).json(createUser);
		} else {
			return res.status(204).send('cannot create the user');
		}
	} catch (err: any) {
		res.status(404).json(err);
	}
}

module.exports = createUser;
