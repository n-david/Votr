exports.seed = function(knex, Promise) {
  return knex('voters').del()
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE voters_id_seq RESTART'),
        knex('voters').insert({name: 'David'}),
        knex('voters').insert({name: 'Sharon'}),
        knex('voters').insert({name: 'Robert'})
      ]);
    });
};
