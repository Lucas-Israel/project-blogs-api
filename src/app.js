const express = require('express');
const { userController } = require('./controllers');
const { tokenValidation } = require('./middlewares');

// ...

const app = express();

app.use(express.json());

app.post('/login', userController.login);
app.post('/user', userController.createUser);
app.get('/user', tokenValidation, userController.getUsers);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada peloo arquivo `src/server.js`
module.exports = app;
