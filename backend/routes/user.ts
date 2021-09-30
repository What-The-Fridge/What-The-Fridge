import express from 'express';
import { json } from 'stream/consumers';
const router = express.Router();
const User = require('../models/User');

//create a user
router.post('/createUser', (req: any, res: any) => {
	// console.log(req.body)
	const user = new User({
		name: req.body.name,
		gender: req.body.gender,
		phoneNum: req.body.phoneNum,
		email: req.body.email,
	});

	user
		.save()
		.then((data: any) => {
			res.json(data);
		})
		.catch((err: any) => {
			res.json({ message: err });
		});
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

module.exports = router;
