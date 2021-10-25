// Sign out route
async function logout(req: any, res: any) {
	await req.session.destroy();
	res.status(200);
	res.json({
		message: 'Logged out successfully',
	});
}

module.exports = logout;
