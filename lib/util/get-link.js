module.exports = function generateRandomString (){
    return Math.random().toString(36).substring(2, 8);
  }
