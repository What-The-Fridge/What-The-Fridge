const User = require('../../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const { v4: uuidv4 } = require('uuid');

const generateUniqueId = async (): Promise<string> => {
	const sessionId = uuidv4();
	const user = await User.findOne({ sessionId });
	return user != null ? generateUniqueId() : sessionId;
};

// authenticate the user in the request with the user in the database.
// TODO: deal with errors for ticket and getPayLoad
// TODO: create sessions
async function authenticate(req: any, res: any) {
	const token = req.params.token;
	if (!token) {
		console.log(token);
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
		// update the User with the identical email
		// 1: create sessionId in db
		var sessionId = await generateUniqueId();
		// 2: save sessionId in db
		const user = await User.findOneAndUpdate(
			{ email: email },
			{ $set: { name: name, picture: picture, sessionId: sessionId } },
			{ upsert: true }
		);
		// 3: send sessionId to user
		if (user) {
			return res.status(200).json({ sessionId: sessionId });
		} else {
			return res.status(204).send("can't find users in database");
		}
	} else {
		return res.status(204).send('invalid token');
	}
}

module.exports = authenticate;
