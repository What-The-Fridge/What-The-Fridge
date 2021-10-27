const User = require('../../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

// authenticate the user in the request with the user in the database.
async function login(req: any, res: any) {
	console.log('logging in');
	console.log(req.sessionID);
	const token = req.params.token;
	if (!token) {
		return res.status(400).send('missing google token');
	}

	// validate the Oauth token from user
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
	});
	const { name, email, picture } = ticket.getPayload();

	// if token is valid
	if (name && email && picture) {
		// 2: save sessionId in db
		const user = await User.findOneAndUpdate(
			{ email: email },
			{ $set: { name: name, picture: picture } },
			{ upsert: true }
		);

		// 3: save the user _id into session
		req.session.userId = user._id;
		req.session.save();
		console.log(req.session);

		// 4: send sessionId to user
		if (user) {
			return res.status(200).json({ sessionId: req.sessionID });
		} else {
			return res.status(204).send("can't find users in database");
		}
	} else {
		return res.status(204).send('invalid token');
	}
}

module.exports = login;
