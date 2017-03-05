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
const cookieParser = require('cookie-parser');


// Seperated Routes for each Resource
//const usersRoutes = require("./routes/users");
const queryHelpers = require("./lib/query-helpers")(knex);
const mailgun     = require("./lib/mailgun");
const pollRoutes = require("./routes/polls")(queryHelpers, mailgun);
const makeLink = require("./lib/util/get-link");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
if (ENV === "development") {
  app.use(morgan("dev"));
  app.use(knexLogger(knex));
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
  const userEmail = req.body.a_email;
  const pollData = {
    email: userEmail,
    title: req.body.title,
    description: req.body.description,
    admin_key: makeLink.generateRandomString(),
    voter_key: makeLink.generateRandomString(),
    date_created: new Date(),
    active: true
  };

  queryHelpers.insertPollTable(pollData, (poll_id) => {
    for (let i = 0; i < req.body.choice.length; i++) {
      const choiceData = {
        title: req.body.choice[i],
        description: req.body.choice_description[i],
        poll_id: poll_id
      }
      queryHelpers.insertChoicesTable(choiceData)
    }
    //for each voter, insert into Voters Table with poll_id
  });
  const adminLink = makeLink.makeAdminLink(pollData.admin_key);
  const voterLink = makeLink.makeVoterLink(pollData.voter_key);
  
  //Send links to mailgun
  mailgun.sendAdminEmail(userEmail, adminLink, voterLink);

  //Send voters links to mailgun 
  if (typeof(req.body.v_email) === 'string') {
    const voterEmail = req.body.v_email;
    mailgun.sendVotersEmail(voterEmail, voterLink)
  }

  if (Array.isArray(req.body.v_email)) {
    const votersEmails = req.body.v_email;
    votersEmails.forEach((voterEmail) => {
      mailgun.sendVotersEmail(voterEmail, voterLink);
    });
  }

  res.cookie("email", userEmail, {maxAge: 3600000});
  res.cookie("voter", pollData.voter_key, {maxAge: 3600000});
  res.redirect(`poll/a/${pollData.admin_key}/success`);

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
