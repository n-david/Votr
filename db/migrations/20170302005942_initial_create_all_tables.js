exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('name');
      table.string('email');
    }),
    knex.schema.createTable('polls', (table) => {
      table.increments();
      table.string('title');
      table.string('description');
      table.string('admin_key');
      table.string('voter_key');
      table.date('date_created');
      table.integer('user_id').references('id').inTable('users');
    }),
    knex.schema.createTable('choices', (table) => {
      table.increments();
      table.string('title');
      table.string('description');
      table.integer('poll_id').references('id').inTable('polls');
    }),
    knex.schema.createTable('voters', (table) => {
      table.increments();
      table.string('name');
    }),
    knex.schema.createTable('results', (table) => {
      table.increments();
      table.integer('rank');
      table.integer('poll_id').references('id').inTable('polls');
      table.integer('choice_id').references('id').inTable('choices');
      table.integer('voter_id').references('id').inTable('voters');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.string('name');
      table.dropColumn('email');
    }),
    knex.raw('DROP TABLE polls CASCADE'),
    knex.raw('DROP TABLE choices CASCADE'),
    knex.raw('DROP TABLE voters CASCADE'),
    knex.raw('DROP TABLE results CASCADE')
  ])
};
