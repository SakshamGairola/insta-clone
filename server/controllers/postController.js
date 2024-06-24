import Post from '../models/Post.js';

export async function createPost(req, res) {
	try {
		const { description } = req.body;
		const post = new Post({
			image: req.file.path,
			description,
		});
		await post.save();
		res.status(201).json(post);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export async function getPosts(req, res) {
	try {
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export async function likePost(req, res) {
	try {
		const post = await Post.findById(req.params.id);
		post.likes++;
		await post.save();
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export async function commentPost(req, res) {
	try {
		const post = await Post.findById(req.params.id);
		post.comments.push({ text: req.body.text });
		await post.save();
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
