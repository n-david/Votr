const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", __dirname + "/../views/");

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
 poll_admin.ejs 
*/
app.get("/poll/a/id", (req, res) => {
  res.render("poll_admin.ejs");
});

/*
 poll_voter.ejs 
*/
app.get("/poll/v/id", (req, res) => {
  res.render("poll_voter.ejs");
});


/*
 success_newpoll.ejs 
*/
app.get("/poll/create/success", (req, res) => {
  res.render("success_newpoll.ejs");
});

/*
 success_votepoll.ejs
*/
app.get("/poll/vote/success", (req, res) => {
  res.render("success_votepoll.ejs");
});

/*
 already_voted.ejs 
*/
app.get("/poll/vote/error", (req, res) => {
  res.render("already_voted.ejs");
});



app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
