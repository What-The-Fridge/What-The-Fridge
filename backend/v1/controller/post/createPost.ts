export {};
const Post = require('../../models/Post');

// create a post
async function createPost(req: any, res: any) {
	try {
		if (!req.body.title || !req.body.description)
			return res.status(400).send('bad input');

		const createPost = await new Post({
			title: req.body.title,
			description: req.body.description,
			body: req.body.body,
		}).save();

		if (createPost) {
			res.status(200).json(createPost);
		} else {
			res.status(204).json('cannot create post');
		}
	} catch (err: any) {
		res.status(404).send(err);
	}
}

module.exports = createPost;
