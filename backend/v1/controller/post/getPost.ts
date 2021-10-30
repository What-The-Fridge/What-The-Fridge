export {};
const Post = require('../../models/Post');

// get a specific post by id
async function getPost(req: any, res: any) {
	try {
		if (!req.params.id) return res.status(400).send('bad input');

		const getPost = await Post.findById(req.params.id);

		if (getPost) {
			return res.status(200).json(getPost);
		} else {
			return res.status(204).json('cannot get post');
		}
	} catch (err: any) {
		return res.status(404).json({ message: err });
	}
}

module.exports = getPost;
