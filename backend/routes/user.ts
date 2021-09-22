import express from 'express';
const router = express.Router();
const User = require('../models/User');

//create a user
router.post('/createuser', (req: any, res: any) => {
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

module.exports = router;
