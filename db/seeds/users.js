exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE users_id_seq RESTART'),
        knex('users').insert({email: 'test@email.com'}),
        knex('users').insert({email: 'wow@email.com'}),
      ]);
    });
};
