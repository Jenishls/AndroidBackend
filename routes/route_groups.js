const routes = require('express').Router()
const handlers = require('../handlers/groupHandler')

routes.post('/', handlers.insertGroup)
routes.get('/:id', handlers.getGroup)
routes.get('/unit/:id', handlers.getUnitGroup)
routes.put('/:id', handlers.updateGroup)
routes.delete('/:id', handlers.deleteGroup)

module.exports = routes