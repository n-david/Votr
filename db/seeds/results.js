exports.seed = function(knex, Promise) {
  return knex('results').del()
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE results_id_seq RESTART'),
        knex('results').insert({rank: 3}),
        knex('results').insert({rank: 1}),
        knex('results').insert({rank: 2}),
        knex('results').insert({rank: 2}),
        knex('results').insert({rank: 3}),
        knex('results').insert({rank: 1}),
        knex('results').insert({rank: 2}),
        knex('results').insert({rank: 3}),
        knex('results').insert({rank: 1}),
      ]);
    });
};
