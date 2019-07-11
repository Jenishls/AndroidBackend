exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('expenses')

    return await knex.schema.createTable('expenses', (table) => {
        table.increments('id')
        table.string('group_id').notNullable()
        table.foreign('group_id')
            .references('groups.id')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

        table.string('user_id').notNullable()
        table.foreign('user_id')
            .references('users.id')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

        table.string('title').notNullable()
        table.string('desc')
        table.float('price').notNullable()
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at');
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('expenses')
};