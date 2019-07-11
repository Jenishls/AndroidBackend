exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('groups')

    return await knex.schema.createTable('groups', (table) => {
        table.increments('id')
        table.string('name')
        table.string('desc')
        // table.timestamps(true,true)
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at');
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('groups')
};