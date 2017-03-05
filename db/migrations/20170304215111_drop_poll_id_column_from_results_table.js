exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('results', (table) => {
      table.dropColumn('poll_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('polls', (table) => {
      table.integer('poll_id').references('id').inTable('polls').onDelete('CASCADE');
    })
  ])
};
