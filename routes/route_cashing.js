const routes = require('express').Router()
const handlers = require('../handlers/cashingHandler')

routes.post('/', handlers.cashingUp)
routes.get('/members/:group_id', handlers.members)

module.exports = routes