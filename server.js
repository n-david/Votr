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
  res.redirect("/poll/a/success");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
