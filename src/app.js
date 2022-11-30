const express = require('express');
const { userController } = require('./controllers');

// ...

const app = express();

app.use(express.json());

app.post('/login', userController.login);
app.post('/user', userController.createUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada peloo arquivo `src/server.js`
module.exports = app;
