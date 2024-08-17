const express = require('express');
const postController = require('./controllers/postController');

const app = express();
app.use(express.json());

app.get('/posts', postController.getAllPosts);
app.get('/posts/:id', postController.getPostById);
app.post('/posts', postController.createPost);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});