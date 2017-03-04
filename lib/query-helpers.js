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
      });
    },

    insertChoicesTable: (choiceData) => {
      knex.insert({title: choiceData.title, description: choiceData.description, poll_id: choiceData.poll_id}).into('choices')
      .catch((err) => {
        console.error(err);
      });
    },

    selectChoicesTable: (visitorKey, done) => {
      knex.select('id').table('polls').where('voter_key', visitorKey).then((results) => {
        return knex.select('*').from('choices').where('poll_id', results[0].id)
      }).then((results) => {
        done(results);
      }).catch((err) => {
        console.error(err);
      });
    },

  //   getPollDataByKey : (key, done) => {
  //     knex.select().from('polls').where('admin_key', key).then((results) => {
  //     }).catch((err) => {
  // console.error(err);
  //   },

    selectPollsTable: (visitorKey, done) => {
      knex.select('title').table('polls').where('voter_key', visitorKey).then((results) => {
        done(results[0].title);
      }).catch((err) => {
        console.error(err);
      });
    }

    // getRank: (done) => {
    //   knex.select('rank').table('results').join.where(id = i)
    // }
  }
}
