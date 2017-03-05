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
        return knex.select().from('choices').where('poll_id', results[0].id)
      }).then((results) => {
        done(results);
      }).catch((err) => {
        console.error(err);
      });
    },

    selectPollsTable: (visitorKey, done) => {
      knex.select().table('polls').where('voter_key', visitorKey).then((results) => {
        done(results[0]);
      }).catch((err) => {
        console.error(err);
      });
    },

    selectPollsTableAdminKey: (adminKey, done) => {
      knex.select('title', 'description').table('polls').where('admin_key', adminKey).then((results) => {
        done(results[0]);
      }).catch((err) => {
        console.error(err);
      });
    },

    insertVotersTable : (name, poll_id, done) => {
      knex.insert({name : name, poll_id : poll_id})
      .returning('id')
      .into('voters')
      .then((id) => {
        done(JSON.parse(id));
      })
      .catch((err) => {
        console.error(err);
      });
    },

    insertResultsTable : (choice_id, rank, voter_id, done) => {
      knex.insert({choice_id : choice_id, rank : rank, voter_id : voter_id})
      .into('results')
      .then(done)
      .catch((err) => {
        console.error(err);
      });
    },
    // getRank: (done) => {
    //   knex.select('rank').table('results').join.where(id = i)
    // }

    getRanks: (adminKey, done) => {
      knex.select('id').table('polls').where('admin_key', adminKey).then((results) => {
        return knex('choices')
        .select('title')
        .sum('rank')
        .join('results', 'choices.id', '=', 'results.choice_id')
        .where('poll_id', results[0].id)
        .groupBy('title')
        .then((results) => {
          done(results);
        })
        .catch((err) => {
          console.error(err);
        });
      });
    },

    getVoter: (adminKey, done) => {
      knex.select('id').table('polls').where('admin_key', adminKey).then((results) => {
        return knex('voters').select('name').where('poll_id', results[0].id)
        .then((results) => {
          done(results);
        })
        .catch((err) => {
          console.error(err);
        });
      });
    },
    selectPollsTableById : (poll_id, done) => {
      knex.select().table("polls").where("id", poll_id).then((results) => {
        console.log(results);
        done(results);
      })
      .catch((err) => {
        console.error(err);
      });
    }

    

    // getRanks: (done) => {
    //   knex.select('rank')
    //   .sum('rank')
    //   .table('results')
    //   .join('choices', 'choice.id', '=', 'results.choice_id')
    //   .where('choices.id', '=', 'choice_id=2')
    //   .OrderBy('choices.id')
    //   .then((resultFinal) => {
    //     // console.log(results);
    //     done(resultFinal[0]);
    //     console.log(resultFinal);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    // }
  }
}
