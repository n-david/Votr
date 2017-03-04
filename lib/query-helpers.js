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

    insertPollTable: (pollData, done) => {
      knex.returning('id').insert({email: pollData.email}).into('users').then((results) => {
        return knex.returning('id').insert({title:pollData.title
          , description: pollData.description
          , admin_key: pollData.admin_key
          , voter_key: pollData.voter_key
          , date_created: pollData.date_created
          , user_id: results[0]
          , active: pollData.active}).into('polls')
      }).then((results) => {
        done(results[0]);
      }).catch((err) => {
        console.error(err);
      })
    },

    insertChoicesTable: (choiceData) => {
      knex.insert({title: choiceData.title, description: choiceData.description, poll_id: choiceData.poll_id}).into('choices')
      .catch((err) => {
        console.error(err);
      })
    },
    getPollDataByKey : (key, done) => {
      knex.select().from('polls').where('admin_key', key).then((results) => {
        done(results);
      }).catch((err) => {
        console.error(err);
      });
    }
  }
}
