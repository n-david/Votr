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

    insertTables: (email, pollData, choiceData, done) => {
      knex.insert({email: email}).into('users').then(() => {
        return knex.select('id').from('users').where('email', email)
      }).then((results) => {
        console.log(results[0].id, 'from query-helper');
        return knex.insert({title:pollData.title
          , description: pollData.description
          , admin_key: pollData.admin_key
          , voter_key: pollData.voter_key
          , date_created: pollData.date_created
          , user_id: results[0].id
          , active: pollData.active}).into('polls')
      }).then(() => {
        return knex.select('id').from('polls').where('title', pollData.title)
      }).then((results) => {
        console.log(results[0], 'should be it, this.id');
        return knex.insert({title: choiceData.title, poll_id: results[0].id}).into('choices')
      }).then((results) => {
        done(results);
      }).catch((err) => {
        console.error(err);
      })
    }
  }
}
