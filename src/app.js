const express = require('express');
const { userController, categoryController, blogPostController } = require('./controllers');
const { tokenValidation } = require('./middlewares');

// ...

const app = express();

app.use(express.json());

app.post('/login', userController.login);
app.post('/user', userController.createUser);
app.get('/user', tokenValidation, userController.getUsers);
app.get('/user/:id', tokenValidation, userController.getUserById);
app.post('/categories', tokenValidation, categoryController.createCategory);
app.get('/categories', tokenValidation, categoryController.getAll);
app.post('/post', tokenValidation, blogPostController.createBlogPost);
app.get('/post', tokenValidation, blogPostController.getPost);
app.get('/post/:id', tokenValidation, blogPostController.getPostById);
app.put('/post/:id', tokenValidation, blogPostController.updatePost);
app.delete('/post/:id', tokenValidation, blogPostController.deletePost);
app.delete('/user/me', tokenValidation, userController.deleteUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada peloo arquivo `src/server.js`
module.exports = app;
