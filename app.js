const express = require('express');
const postsRouter = require('./routes/posts');

const app = express();
app.use(express.json());

app.use('/posts', postsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});