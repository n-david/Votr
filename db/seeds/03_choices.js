exports.seed = function(knex, Promise) {
  return knex('choices').del()
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE choices_id_seq RESTART'),
        knex('choices').insert({title: 'Beach volleyball', description: 'Jericho Beach', poll_id: 1}),
        knex('choices').insert({title: 'Watch a movie', description: 'Moonlight', poll_id: 1}),
        knex('choices').insert({title: 'Netflix and chill', description: 'Bring snacks!', poll_id: 1}),
        knex('choices').insert({title: 'iPhone 8', description: 'Revolutionary', poll_id: 2}),
        knex('choices').insert({title: 'Samsung Galaxy S8', description: 'Blows up', poll_id: 2}),
        knex('choices').insert({title: 'Google Pixel', description: 'Runs Android', poll_id: 2}),
      ]);
    });
};
