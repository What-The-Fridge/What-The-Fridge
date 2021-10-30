export {};
const User = require('../../models/User');

//delete a user by id
async function deleteUser(req: any, res: any) {
	try {
		if (!req.params.id) return res.status(404).send('bad input');

		const deleteUser = await User.deleteOne({ _id: req.params.id });
		if (deleteUser) {
			res.status(200).json(deleteUser);
		} else {
			res.status(204).send('no such user to delete');
		}
	} catch (err: any) {
		res.status(404).log({ message: err });
	}
}

module.exports = deleteUser;
