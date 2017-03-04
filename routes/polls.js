const express = require('express');
const router  = express.Router();


module.exports = (queryHelpers) => {

  //All routes that prefixes with /polls/ go here
  router.get("/a/id", (req, res) => {
    res.render("poll_admin");
  });

  router.get("/a/success", (req, res) => {
    res.render("success_newpoll");
  });

  router.get("/v/id", (req, res) => {
    queryHelpers.selectChoicesTable((results) => {
      res.render('poll_voter', {results})
    })
  });

  router.get("/v/success", (req, res) => {
    res.render("success_votepoll");
  });

  router.get("/v/error", (req, res) => {
    res.render("already_voted");
  });

  router.get("/all/", (req, res) => {
    queryHelpers.getAllPolls((allPolls) => {
      res.json(allPolls);
    });
  });

  return router;
}
