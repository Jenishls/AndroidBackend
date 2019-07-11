exports.up = async function(knex, Promise) {
    await knex.schema.table('users', table => {
        table.string('img').defaultTo('public/uploads/user.png')
    })
};

exports.down = async function(knex, Promise) {
    await knex.schema.table('users', table => {
        table.dropColumn('img')
    })
};