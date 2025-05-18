const clientsRouter = require('express').Router();
const path = require('path');

clientsRouter.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

module.exports = clientsRouter;