import express from 'express';
const router = express.Router();
const User = require('../models/User');

//create a user
router.post('/createUser', async (req: any, res: any) => {
	try {
		if (!req.body.name) return res.status(400).send('bad input');

		const createUser = await new User({
			name: req.body.name,
			gender: req.body.gender,
			phoneNum: req.body.phoneNum,
			email: req.body.email,
		}).save;

		if (createUser) {
			return res.status(200).json(createUser);
		} else {
			return res.status(204).send('cannot create the user');
		}
	} catch (err: any) {
		res.status(404).json(err);
	}
});

//get users by email or phone
router.get('/byEmailOrPhone', async (req: any, res: any) => {
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
});

//delete a user by id
router.delete('/deleteUser/:id', async (req: any, res: any) => {
	try {
		const id = req.body.id;
		if (!id) return res.status(404).send('bad input');

		const deleteUser = await User.deleteOne({ _id: req.body.id });
		if (deleteUser) {
			res.status(200).json(deleteUser);
		} else {
			res.status(204).send('no such user to delete');
		}
	} catch (err: any) {
		res.status(404).log({ message: err });
	}
});

module.exports = router;
