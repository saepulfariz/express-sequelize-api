const {
    User,
    Post
} = require('../models');

exports.index = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Post,
                as: 'posts'
            }]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.show = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [{
                model: Post,
                as: 'posts'
            }]
        });
        if (!user) return res.status(404).json({
            message: 'User not found'
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.create = async (req, res) => {
    try {
        const {
            name,
            email
        } = req.body;
        const newUser = await User.create({
            name,
            email
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const {
            name,
            email
        } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({
            message: 'User not found'
        });

        user.name = name;
        user.email = email;
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({
            message: 'User not found'
        });

        await user.destroy();
        res.json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};