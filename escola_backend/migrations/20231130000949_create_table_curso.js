/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('curso', table => {
        table.increments('id').primary()
        table.string('nome').notNullable()
        table.string('professor')
        table.string('categoria')    
        table.string('descricao')
        table.boolean('ativo').defaultTo(true)
        table.binary('imagem')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('curso')
};
