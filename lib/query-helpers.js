module.exports = function(knex) {
  //All knes query select/insert calls go here

  return {
    getAllPolls : (done) => {
      knex.select().table("polls").then((results) => {
        done(results);
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        knex.destroy();
      });
    },
    insertEmailUsers: (email, done) => {
     knex.insert({email: email}).into("users").then((results) => {
       done(results);
     }).catch((err) => {
       console.error(err);
     });
    },
    getUserIdByEmail : (email, done) => {
      knex.select("id").from("users").where('email', email).then((results) => {
        done(results);
      }).catch((err) => {
        console.error(err);
      });
    }
      //  knex('polls').insert({title: pollObj.title, description: pollObj.description}).then()
   }
};