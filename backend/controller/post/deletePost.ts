export {};
const Post = require('../../models/Post');

// delete a specific post by id
async function deletePost(req: any, res: any) {
	try {
		if (!req.params.id) return res.status(400).send('bad input');

		// deleteOne = remove
		const deletePost = await Post.deleteOne({ _id: req.params.id });

		if (deletePost) {
			return res.status(200).json(deletePost);
		} else {
			return res.status(204).json('cannot delete post');
		}
	} catch (err: any) {
		return res.status(404).json({ message: err });
	}
}

module.exports = deletePost;
