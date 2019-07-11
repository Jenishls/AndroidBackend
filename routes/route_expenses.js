const routes = require('express').Router()
const handlers = require('../handlers/expenseHandler')

routes.post('/', handlers.insertExpense)
routes.get('/:id', handlers.getExpense)
routes.get('/unit/:id', handlers.getUnitExpense)
routes.put('/', handlers.updateExpense)
routes.delete('/:id', handlers.deleteExpense)
routes.get('/total/:group_id/', handlers.groupExpenses)
routes.get('/total/:group_id/:user_id', handlers.unitExpenses)

module.exports = routes

// https://10.100.200.2
// policy ipv4