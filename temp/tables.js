exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE users_id_seq RESTART'),
        knex('users').insert({email: 'test@email.com'}),
        knex('users').insert({email: 'wow@email.com'}),
      ]);
    })
    .then(function () {
      knex('polls').del()
      return Promise.all([
        knex.raw('ALTER SEQUENCE polls_id_seq RESTART'),
        knex('polls').insert({title: 'Where should we go on Friday?'
          , description: 'Looks like it will be a sunny day!'
          , admin_key: 'abc'
          , voter_key: 'xyz'
          , date_created: new Date()
          , user_id: 1
          , active: true
        }),
        knex('polls').insert({title: 'Which phone should I buy?'
          , description: 'Preferably touchscreen'
          , admin_key: '123'
          , voter_key: '789'
          , date_created: new Date()
          , user_id: 2
          , active: false
        }),
      ]);
    })
    .then(function () {
      knex('choices').del()
      return Promise.all([
        knex.raw('ALTER SEQUENCE choices_id_seq RESTART'),
        knex('choices').insert({title: 'Beach volleyball', description: 'Jericho Beach', poll_id: 1}),
        knex('choices').insert({title: 'Watch a movie', description: 'Moonlight', poll_id: 1}),
        knex('choices').insert({title: 'Netflix and chill', description: 'Bring snacks!', poll_id: 1}),
        knex('choices').insert({title: 'iPhone 8', description: 'Revolutionary', poll_id: 2}),
        knex('choices').insert({title: 'Samsung Galaxy S8', description: 'Blows up', poll_id: 2}),
        knex('choices').insert({title: 'Google Pixel', description: 'Runs Android', poll_id: 2}),
      ]);
    })
    .then(function () {
      knex('voters').del()
      return Promise.all([
        knex.raw('ALTER SEQUENCE voters_id_seq RESTART'),
        knex('voters').insert({name: 'David'}),
        knex('voters').insert({name: 'Sharon'}),
        knex('voters').insert({name: 'Robert'})
      ]);
    })
    .then(function () {
      knex('results').del()
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
