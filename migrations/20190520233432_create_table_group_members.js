exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('group_members')

    return await knex.schema.createTable('group_members', (table) => {
        table.increments('id')

        table.integer('group_id').unsigned()
        table.foreign('group_id')
            .references('groups.id')
            
            .onUpdate('cascade')
            .onDelete('restrict')

        table.integer('user_id').unsigned()
        table.foreign('user_id')
            .references('users.id')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at');
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('groups_members')
};