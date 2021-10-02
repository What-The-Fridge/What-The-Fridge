import express from 'express';
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req: any, res: any) => {
	res.send('We are on post');
});

// create a post
router.post('/createPost', async (req: any, res: any) => {
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
});

// get a specific post by id
router.get('/getPost/:id', async (req: any, res: any) => {
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
});

// delete a specific post by id
router.delete('/deletePost/:id', async (req: any, res: any) => {
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
});

module.exports = router;
