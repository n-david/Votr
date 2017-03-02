const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set('views', __dirname + '/../views/');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

/*
 index.ejs
*/
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", (req, res) => {
  const email = req.body.email
  var api_key = 'key-80216e96640c6edd8a9e5bb8a9bcaae7';
  var domain = 'sandboxa721143bbca24e14bca66e736c6fdfb9.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

  var data = {
    from: 'Votr <postmaster@sandboxa721143bbca24e14bca66e736c6fdfb9.mailgun.org>',
    to: email,
    subject: 'Votr Admin/Voter Links',
    text: `Testing some Mailgun awesomness! \n Admin url: adminURL \n Voter url: voterURL`
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
  res.redirect("/poll/create/success");
});

/*
 success_newpoll.ejs
*/
app.get("/poll/success", (req, res) => {
  res.render("success_newpoll.ejs");
});

/*
 success_votepoll.ejs
*/
app.get("/poll/vote/success", (req, res) => {
  res.render("success_votepoll.ejs");
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`);
});
