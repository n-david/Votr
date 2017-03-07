require('dotenv').config();

module.exports = {

  sendAdminEmail : function(adminEmail, adminURL, voterURL) {
    const mailgun = require('mailgun-js')({apiKey: process.env.api_key, domain: process.env.domain});
    const data = {
      from: 'Votr <postmaster@sandboxa721143bbca24e14bca66e736c6fdfb9.mailgun.org>',
      to: adminEmail,
      subject: 'Votr Admin/Voter Links',
      text: `Here are your links! \n Admin url: ${adminURL} \n Voter url: ${voterURL}`
    };
    mailgun.messages().send(data, (error, body) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  },

  sendVotersEmail: function(voterEmail, voterURL) {
    const mailgun = require('mailgun-js')({apiKey: process.env.api_key, domain: process.env.domain});
    const data = {
      from: 'Votr <postmaster@sandboxa721143bbca24e14bca66e736c6fdfb9.mailgun.org>',
      to: voterEmail,
      subject: 'You have been invited to vote in a poll!',
      text: `Go to the following to cast your vote: \n ${voterURL}`
    };
    mailgun.messages().send(data, (error, body) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  },
  sendAdminResults : function(adminEmail, adminKey) {
    const mailgun = require('mailgun-js')({apiKey: process.env.api_key, domain: process.env.domain});
    const data = {
      from: 'Votr <postmaster@sandboxa721143bbca24e14bca66e736c6fdfb9.mailgun.org>',
      to: adminEmail,
      subject: 'OoooOOoo someone just voted!',
      text: `Check out your results! \n http://localhost:8080/poll/a/${adminKey}`
    };
    mailgun.messages().send(data, (error, body) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  }
};







