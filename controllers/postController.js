const {
    Post,
    User
} = require('../models');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['name'] // hanya mengambil field 'name' dari User
            }]
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'user',
                attributes: ['name'] // hanya mengambil field 'name' dari User
            }]
        });
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

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({
            message: 'Post not found'
        });

        await post.destroy();
        res.json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};