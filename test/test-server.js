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
