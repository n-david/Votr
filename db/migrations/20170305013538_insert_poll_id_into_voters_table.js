exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('voters', (table) => {
      table.integer('poll_id').references('id').inTable('polls').onDelete('CASCADE');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('voters', (table) => {
      table.dropColumn('poll_id');
    })
  ])
};
