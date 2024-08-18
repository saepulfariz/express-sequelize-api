const express = require('express');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});