const User = require('../../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

// authenticate the user in the request with the user in the database.
// TODO: deal with errors for ticket and getPayLoad
// TODO: create sessions
async function authenticate(req: any, res: any) {
	const token = req.params.token;
	if (!token) {
		console.log(token);
		return res.status(400).send('missing google token');
	}

	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
	});
	const { name, email, picture } = ticket.getPayload();

	//update the User with the identical email
	const user = await User.findOneAndUpdate(
		{ email: email },
		{ $set: { name: name, picture: picture } },
		{ upsert: true }
	);

	console.log(user);

	req.session.userId = user._id;

	if (user) {
		return res.status(200).send(user);
	} else {
		return res.status(204).send("can't find users in database");
	}
}

module.exports = authenticate;
