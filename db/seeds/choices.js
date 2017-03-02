exports.seed = function(knex, Promise) {
  return knex('choices').del()
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE choices_id_seq RESTART'),
        knex('choices').insert({title: 'Beach volleyball', description: 'Jericho Beach'}),
        knex('choices').insert({title: 'Watch a movie', description: 'Moonlight'}),
        knex('choices').insert({title: 'Netflix and chill', description: 'Bring snacks!'})
      ]);
    });
};
