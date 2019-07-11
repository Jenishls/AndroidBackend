const config = require('../knexfile')
const knex = require('knex')(config)
const auth = require('../middleware/authMiddleware')

const insertGroup = (req, res) => {
    auth.check(req, res)
    knex('groups')
        .insert({
            name: req.body.name,
            desc: req.body.desc
        })
        // .into('group_members')
        .then(data => {
            // console.log(data)
            return knex('group_members')
                .insert({
                    group_id: data[0],
                    user_id: req.body.user_id
                })
        })
        .then(data => {
            res.json({
                status: "ok"
            })
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: error
            })
        });
}

const getGroup = (req, res) => {
    auth.check(req, res)
    knex
        .select('*')
        .from('groups')
        .join('group_members', 'groups.id', '=', 'group_members.group_id')
        .where('group_members.user_id', req.params.id)
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


const getUnitGroup = (req, res) => {
    auth.check(req, res)

    knex
        .from('groups')
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


const updateGroup = (req, res) => {
    auth.check(req, res)
    knex('groups')
        .where({ id: req.params.id })
        .update({
            name: req.body.name,
            desc: req.body.desc,
            updated_at: knex.raw('now()')
        })
        .then(data => {
            res.json({
                status: 'ok',
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

const deleteGroup = (req, res) => {
    auth.check(req, res)

    knex('groups')
        .where('id', req.params.id)
        .del()
        .then(data => {
            res.json({
                status: "deleted"
            })

        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "error"
            });
        })
}

module.exports = {
    "insertGroup": insertGroup,
    "getGroup": getGroup,
    "getUnitGroup": getUnitGroup,
    "updateGroup": updateGroup,
    "deleteGroup": deleteGroup
}