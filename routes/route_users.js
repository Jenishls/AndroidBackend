const routes = require('express').Router()
const handlers = require('../handlers/userHandler')


routes.get('/profile/:id', handlers.getUser)
routes.get('/:email', handlers.searchUser)
routes.put('/', handlers.updateUser)
routes.put('/profile/upload/:id', handlers.uploadUser)
routes.delete('/', handlers.deleteUser)

module.exports = routes