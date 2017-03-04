const config = {
  api_key : 'key-80216e96640c6edd8a9e5bb8a9bcaae7',
  domain  : 'sandboxa721143bbca24e14bca66e736c6fdfb9.mailgun.org'
}

module.exports = function(email, adminURL, voterURL) {
  const mailgun = require('mailgun-js')({apiKey: config.api_key, domain: config.domain});
  const data = {
    from: 'Votr <postmaster@sandboxa721143bbca24e14bca66e736c6fdfb9.mailgun.org>',
    to: email,
    subject: 'Votr Admin/Voter Links',
    text: `Testing some Mailgun awesomness! \n Admin url: ${adminURL} \n Voter url: ${voterURL}`
  };
  mailgun.messages().send(data, (error, body) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(body);
  });
};



  

  