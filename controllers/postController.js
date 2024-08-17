const {
    Post
} = require('../models');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({
            message: 'Post not found'
        });
        res.json(post);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.createPost = async (req, res) => {
    try {
        const {
            title,
            content
        } = req.body;
        const newPost = await Post.create({
            title,
            content
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const {
            title,
            content
        } = req.body;
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({
            message: 'Post not found'
        });

        post.title = title;
        post.content = content;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};