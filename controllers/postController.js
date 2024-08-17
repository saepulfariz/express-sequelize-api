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