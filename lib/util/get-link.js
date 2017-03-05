module.exports = {
  generateRandomString : function() {
    return Math.random().toString(36).substring(2, 8);
  },
  makeAdminLink : function(adminKey) {
    return `http://localhost:8080/poll/a/${adminKey}`;
  },
  makeVoterLink : function(voterKey) {
    return `http://localhost:8080/poll/v/${voterKey}`;
  }
};

