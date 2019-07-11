const config = require('../knexfile')
const knex = require('knex')(config)
const auth = require('../middleware/authMiddleware')

const insertGroupMembers = (req, res) => {
    auth.check(req, res)
    console.log(req.body)
    knex('group_members')
        .insert({
            group_id: req.body.group_id,
            user_id: req.body.user_id
        })
        .then(data => {
            res.json({
                status: "ok"
            })
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "error"
            })
        });
}

const getGroupMembers = (req, res) => {
    auth.check(req, res)

    knex('group_members')
        .where('group_id', req.params.group_id)
        .join('users', { 'group_members.user_id': 'users.id' })
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

    knex('group_members')
        .select('user_id')
        .where('group_id', req.params.group_id)
        .then(data => {
            let idArray = [];
            data.forEach(function(val, index) {
                /* iterate through array or object */
                idArray.push(val.user_id)
            })

            knex('users')
                .where('email', 'like', req.params.email + '%')
                .whereNotIn('id', idArray)
                .then(data => {
                    res.json(data)
                })
                .catch(error => {
                    console.log(error);
                    res.json({
                        status: "error"
                    })
                })
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "error"
            })
        })
}

const updateGroupMembers = (req, res) => {
    auth.check(req, res)

    knex('group_members')
        .where({ id: req.body.id })
        .update({
            group_id: req.body.groupId,
            user_id: req.body.userId,
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

const deleteGroupMembers = (req, res) => {
    auth.check(req, res)

    knex('group_members')
        .where("user_id", req.params.user_id)
        .where("group_id", req.params.group_id)
        .whereNotExists(function() {
            this.select("*")
                .from("expenses")
                .whereRaw('group_members.user_id = expenses.user_id')
                .whereRaw('group_members.group_id = expenses.group_id')
        })
        .del()
        .then(data =>{
            if(data == 1){
              res.json({status : true})  

            }else if(data == 0){
               res.json({status : false})     
            }
        } )
        .catch(error => console.log(error))

    // knex('group_members')
    // .where('group_id', req.params.group_id)
    // .where('user_id',req.params.user_id)
    // .del()
    // .then(data => {
    // 	console.log(data)
    //     res.json({
    //         status: "deleted"
    //     })
    // })
    // .catch(error => {
    //     console.log(error);
    //     res.json({
    //         status: "error"
    //     });
    // })
}

module.exports = {
    "insertGroupMembers": insertGroupMembers,
    "getGroupMembers": getGroupMembers,
    "searchUser": searchUser,
    "updateGroupMembers": updateGroupMembers,
    "deleteGroupMembers": deleteGroupMembers
}