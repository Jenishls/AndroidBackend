const routes = require('express').Router()
const handlers = require('../handlers/groupMembersHandler')

routes.post('/', handlers.insertGroupMembers)
routes.get('/:group_id', handlers.getGroupMembers)
routes.put('/', handlers.updateGroupMembers)
routes.delete('/:group_id/:user_id', handlers.deleteGroupMembers)
routes.get('/:group_id/:email', handlers.searchUser)

module.exports = routes