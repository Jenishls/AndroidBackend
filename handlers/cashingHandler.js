const config = require('../knexfile')
const knex = require('knex')(config)
const auth = require('../middleware/authMiddleware')

const cashingUp = (req, res) => {
    auth.check(req, res)

    knex('expenses')
        .sum('price as group_total')
        .where('group_id', req.body.group_id)
        .then(data => data[0])
        .then(data => {
            knex('group_members')
                .count('user_id as user_count')
                .where('group_id', req.body.group_id)
                .then(data1 => data1[0])
                .then(data1 => {
                    knex('expenses')
                        .sum('price as unit_total')
                        .where('group_id', req.body.group_id)
                        .where('user_id', req.body.user_id)
                        .then(data2 => data2[0])
                        .then(data2 => {
                            data[Object.keys(data1)[0]] = data1.user_count
                            data[Object.keys(data2)[0]] = data2.unit_total
                            res.json(data)
                        })
                })
        })

        .catch(error => res.json(error))
}

const members = (req, res) => {
    auth.check(req, res)

    knex('group_members as gm')
        .sum('price as amount')
        .select('gm.*', 'users.name', 'users.img')
        .where('gm.group_id', req.params.group_id)
        .join('users', { 'users.id': 'gm.user_id' })
        .leftJoin('expenses', function() {
            this.on('expenses.user_id', '=', 'gm.user_id')
                .andOn('expenses.group_id', '=', 'gm.group_id')
        })
        .groupBy('gm.user_id')
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

module.exports = {
    "cashingUp": cashingUp,
    "members": members,
}