import User = require('../../models/User');
import express from 'express';
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

// authenticate the user in the request with the user in the database
// TODO: change upsert into appropriate function for MongoDB
async function authenticate(req: any, res: any) {
	const { token } = req.body;
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
	});
	const { name, email, picture } = ticket.getPayload();
	const user = await User.upsert({
		where: { email: email },
		update: { name, picture },
		create: { name, email, picture },
	});
	res.status(201);
	res.json(user);
}

module.exports = authenticate;
