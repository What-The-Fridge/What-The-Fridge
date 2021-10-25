// get current user
async function me(req: any, res: any) {
	res.status(200);
	res.json(req.user);
}

module.exports = me;
