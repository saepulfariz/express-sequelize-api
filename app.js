const express = require('express');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const {
    authenticateToken
} = require('./middleware/authMiddleware');


const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/posts', authenticateToken, postsRouter);
app.use('/users', authenticateToken, usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});