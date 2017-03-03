module.exports = function(knex) {
  //All knes query select/insert calls go here

  return {
    getAllPolls: (done) => {
      knex.select().table("polls").then((results) => {
        done(results);
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        knex.destroy();
      });
    },

    insertEmailUsers: (req, done) => {
      knex('polls').insert({title: req.title, description: req.description
      }).catch((err) => {
        console.error(err);
      });
    }
  }
};
