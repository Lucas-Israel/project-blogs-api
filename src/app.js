const express = require('express');
const { userController, categoryController } = require('./controllers');
const { tokenValidation } = require('./middlewares');

// ...

const app = express();

app.use(express.json());

app.post('/login', userController.login);
app.post('/user', userController.createUser);
app.get('/user', tokenValidation, userController.getUsers);
app.get('/user/:id', tokenValidation, userController.getUserById);
app.post('/categories', tokenValidation, categoryController.createCategory);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada peloo arquivo `src/server.js`
module.exports = app;
