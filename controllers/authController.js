const jwt = require('jsonwebtoken');
const {
    User
} = require('../models');

let refreshTokens = [];

exports.register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;
        const user = await User.create({
            name,
            email,
            password
        });
        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user || !(await user.validatePassword(password))) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const accessToken = generateAccessToken({
            id: user.id,
            name: user.name
        });
        const refreshToken = jwt.sign({
            id: user.id,
            name: user.name
        }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.token = (req, res) => {
    const {
        token
    } = req.body;
    if (token == null) return res.sendStatus(401);
    if (!refreshTokens.includes(token)) return res.sendStatus(403);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({
            id: user.id,
            name: user.name
        });
        res.json({
            accessToken
        });
    });
};

exports.logout = (req, res) => {
    const {
        token
    } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.status(204).json({
        message: 'Logout successful'
    });
};

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCCESS_TOKEN_AGE
    });
}