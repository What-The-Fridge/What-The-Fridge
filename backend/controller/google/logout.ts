export {};
const Session = require('../../models/Session');

// Sign out route
async function logout(req: any, res: any) {
	if (!req.headers.sid) {
		return res.status(400).send('invalid input');
	}

	// delete the session from db
	await req.session.destroy(); // not sure if this is needed
	const deleteSession = await Session.deleteOne({ _id: req.headers.sid });

	if (deleteSession) {
		res.status(200).json({
			message: 'Logged out successfully',
		});
	} else {
		res.status(204).send('logout error');
	}
}

module.exports = logout;
