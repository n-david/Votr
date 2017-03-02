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
