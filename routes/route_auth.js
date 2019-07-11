const routes = require('express').Router()
const handlers = require('../handlers/authHandler')

routes.post('/register', handlers.register)
routes.post('/login', handlers.authenticate)
routes.post('/checkAuth', handlers.checkAuth);

module.exports = routes