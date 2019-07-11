const config = require('../knexfile')
const knex = require('knex')(config)
const auth = require('../middleware/authMiddleware')

const insertExpense = (req, res) => {
    auth.check(req, res)

    knex('expenses')
        .insert({
            group_id: req.body.group_id,
            user_id: req.body.user_id,
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price
        })
        .then(data => {
            res.json({
                status: true
            })
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "error"
            })
        });
}

const getExpense = (req, res) => {
    auth.check(req, res)

    knex('expenses')
        .select('expenses.id as exp_id', 'expenses.*', 'users.*')
        .join('users', 'users.id', '=', 'expenses.user_id')
        .where('expenses.group_id', req.params.id)

        .then(data => {
            res.json(data)
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "error"
            })
        });
}

const getUnitExpense = (req, res) => {
    auth.check(req, res)
    knex('expenses')
        .where('id', req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "error"
            })
        });
}

const updateExpense = (req, res) => {
    auth.check(req, res)

    knex('expenses')
        .where({ id: req.body.id })
        .update({
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            updated_at: knex.raw('now()')
        })
        .then(data => {
            res.json({
                status: true,
                data: data,
                error: false
            })
        })
        .catch(error => {
            res.json({
                status: "error"
            })
        })
}

const deleteExpense = (req, res) => {
    auth.check(req, res)
    knex('expenses')
        .where('id', req.params.id)
        .del()
        .then(data => {
            res.json({
                status: true
            })

        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "error"
            });
        })
}

const groupExpenses = (req, res) => {
    auth.check(req, res)
    knex('expenses')
        .sum('price as group_total')
        .where('group_id', req.params.group_id)
        .then(data => {
            // console.log(data)
            res.json(data[0])
        })
        .catch(error => res.json(error))
}

const unitExpenses = (req, res) => {
    auth.check(req, res)
    knex('expenses')
        .sum('price as unit_total')
        .where('group_id', req.params.group_id)
        .where('user_id', req.params.user_id)
        .then(data => res.json(data[0]))
        .catch(error => res.json(error))
}

module.exports = {
    "insertExpense": insertExpense,
    "getExpense": getExpense,
    "getUnitExpense": getUnitExpense,
    "updateExpense": updateExpense,
    "deleteExpense": deleteExpense,
    "groupExpenses": groupExpenses,
    "unitExpenses": unitExpenses
}