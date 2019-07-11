const config = require('../knexfile')
const knex = require('knex')(config)
const auth = require('../middleware/authMiddleware')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const updateUser = (req, res) => {
    knex('users')
        .where('id', req.body.id)
        .update({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.new, 10)
        })
        .then(data => res.json({ status: true }))
        .catch(error => {
            console.log(error)
            res.json({ status: false })
        })

}

const uploadUser = (req, res) => {
    knex('users')
        .where('id', req.params.id)
        .update({
            img: req.body.img
        })
        .then(data => res.json({ status: " true" }))
        .catch(error => {
            console.log(error)
            res.json({ status: false })
        })
}

const getUser = (req, res) => {
    knex
        .select('id', 'name', 'email', 'img')
        .from('users')
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


const searchUser = (req, res) => {
    auth.check(req, res)

    knex('users')
        .where('email', 'like', '%' + req.params.email + '%')
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



const deleteUser = (req, res) => {
    auth.check(req, res)

    knex('users')
        .where('id', request.body.userId)
        .del()
        .then(data => {
            response.json({
                status: "deleted"
            })

        })
        .catch(error => {
            console.log(error);
            response.json({
                status: "error"
            });
        })
}

module.exports = {
    "getUser": getUser,
    "searchUser": searchUser,
    "updateUser": updateUser,
    "uploadUser": uploadUser,
    "deleteUser": deleteUser
}