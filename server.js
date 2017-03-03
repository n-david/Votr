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
const path = require('path');


// Seperated Routes for each Resource
//const usersRoutes = require("./routes/users");
const queryHelpers = require("./lib/query-helpers")(knex);
const pollRoutes = require("./routes/polls")(queryHelpers);
const mailgun     = require("./lib/mailgun");
const makeKey = require("./lib/util/get-link");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
if (ENV === "development") {
  app.use(morgan("dev"));
  app.use(knexLogger(knex));
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//node-sass 
app.use(sass({
  src: path.join(__dirname, "styles"),
  dest: path.join(__dirname, "public/styles"),
  debug: true,
  outputStyle: 'expanded',
  prefix: '/styles'
}),express.static("public"));

// Mount all resource routes
app.use("/poll", pollRoutes);

// Home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", (req, res) => {
  const pollData = {
    email: req.body.email,
    title: req.body.title,
    description: req.body.description,
    admin_key: makeKey(),
    voter_key: makeKey(),
    date_created: new Date(),
    active: true
  };

  queryHelpers.insertPollTable(pollData, (poll_id) => {
    console.log(poll_id, 'from server, poll_id**************************************************')
    console.log(req.body);
    console.log(req.body.choice);
    for (let i = 0; i < req.body.choice.length; i++) {
      const choiceData = {
        title: req.body.choice[i],
        description: req.body.choice_description[i],
        poll_id: poll_id
      }
      queryHelpers.insertChoicesTable(choiceData)
    }
    // for (let choice of req.body.choice) {
    //   console.log(choice, 'within for loop');
    //   const choiceData = {
    //     title: choice,
    //     description: '',
    //     poll_id: poll_id
    //   }
    //   queryHelpers.insertChoicesTable(choiceData)
    // }
  });

  res.redirect("poll/a/success");

  //Send links to mailgun
  mailgun(req.body.email);

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
