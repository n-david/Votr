exports.seed = function(knex, Promise) {
  return knex('polls').del()
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE polls_id_seq RESTART'),
        knex('polls').insert({title: 'Where should we go on Friday?'
          , description: 'Looks like it will be a sunny day!'
          , admin_key: 'abc'
          , voter_key: 'xyz'
          , date_created: new Date()
        }),
        knex('polls').insert({title: 'Where should we go on Friday?'
          , description: 'Looks like it will be a sunny day!'
          , admin_key: '123'
          , voter_key: '789'
          , date_created: new Date()
        }),
      ]);
    });
};
