require('dotenv').config();

module.exports = function(email) {
  const mailgun = require('mailgun-js')({apiKey: process.env.api_key, domain: process.env.domain});
  const data = {
    from: 'Votr <postmaster@sandboxa721143bbca24e14bca66e736c6fdfb9.mailgun.org>',
    to: email,
    subject: 'Votr Admin/Voter Links',
    text: `Testing some Mailgun awesomness! \n Admin url: adminURL \n Voter url: voterURL`
  };
  mailgun.messages().send(data, (error, body) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(body);
  });
};






