exports.seed = function(knex, Promise) {
  return knex('results').del()
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE results_id_seq RESTART'),
        knex('results').insert({rank: 3, poll_id: 1, choice_id: 1, voter_id: 3}),
        knex('results').insert({rank: 1, poll_id: 1, choice_id: 2, voter_id: 2}),
        knex('results').insert({rank: 2, poll_id: 1, choice_id: 3, voter_id: 1}),
        knex('results').insert({rank: 2, poll_id: 1, choice_id: 1, voter_id: 2}),
        knex('results').insert({rank: 3, poll_id: 1, choice_id: 3, voter_id: 1}),
        knex('results').insert({rank: 1, poll_id: 1, choice_id: 2, voter_id: 3}),
        knex('results').insert({rank: 2, poll_id: 1, choice_id: 3, voter_id: 2}),
        knex('results').insert({rank: 3, poll_id: 1, choice_id: 2, voter_id: 1}),
        knex('results').insert({rank: 1, poll_id: 1, choice_id: 1, voter_id: 3}),
        knex('results').insert({rank: 2, poll_id: 2, choice_id: 4, voter_id: 3}),
        knex('results').insert({rank: 3, poll_id: 2, choice_id: 6, voter_id: 2}),
        knex('results').insert({rank: 1, poll_id: 2, choice_id: 5, voter_id: 1}),
        knex('results').insert({rank: 2, poll_id: 2, choice_id: 4, voter_id: 1}),
        knex('results').insert({rank: 3, poll_id: 2, choice_id: 6, voter_id: 2}),
        knex('results').insert({rank: 1, poll_id: 2, choice_id: 5, voter_id: 3}),
        knex('results').insert({rank: 3, poll_id: 2, choice_id: 5, voter_id: 2}),
        knex('results').insert({rank: 1, poll_id: 2, choice_id: 6, voter_id: 3}),
        knex('results').insert({rank: 2, poll_id: 2, choice_id: 4, voter_id: 1}),
      ]);
    });
};
