require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');


// Seperated Routes for each Resource
//const usersRoutes = require("./routes/users");
const queryHelpers = require("./lib/query-helpers")(knex);
const pollRoutes = require("./routes/polls")(queryHelpers);
const mailgun     = require("./lib/mailgun");
const makeKey = require("./lib/util/get-link");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));
app.use("/poll", pollRoutes);

// Home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", (req, res) => {
  const email = req.body.email;
  const choices = req.body.choice;
  const pollData = {
    title: req.body.title,
    description: req.body.description,
    admin_key: makeKey(),
    voter_key: makeKey(),
    date_created: new Date(),
    active: true
  };
  const choiceData = {
    title: req.body['choice-description'],
    description: '',
  };

  queryHelpers.insertTables(email, pollData, choiceData, (results) => {
    console.log(results, 'from server, after promises')
    res.redirect("poll/a/success");
  });

  //Send links to mailgun
  mailgun(req.body.email);

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
