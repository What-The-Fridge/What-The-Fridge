export {};
const User = require('../../models/User');

//get users by email or phone
async function byEmailOrPhone(req: any, res: any) {
	try {
		const { email, phone } = req.query;
		if (!email && !phone) return res.status(400).send('bad input');

		const byEmailOrPhone = await User.findOne(email ? { email } : { phone });
		if (byEmailOrPhone) {
			return res.status(200).json(byEmailOrPhone);
		} else {
			return res.status(204);
		}
	} catch (err: any) {
		res.status(404).log({ message: err });
	}
}

module.exports = byEmailOrPhone;
