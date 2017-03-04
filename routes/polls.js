const express = require('express');
const router  = express.Router();


module.exports = (queryHelpers) => {

  //All routes that prefixes with /polls/ go here
  router.get("/a/:akey", (req, res) => {
    const adminKey = req.params.akey;
    queryHelpers.selectPollsTableAdminKey(adminKey, (resultTitle) => {
      // queryHelpers.getRanks(adminKey, (resultRanks) => {
      //   console.log(resultRanks);
      //   res.render("poll_admin", {resultTitle, resultRanks});
      // })
      res.render("poll_admin", {resultTitle});
    });
  });

  router.get("/a/:akey/success", (req, res) => {

    const userData = {
      userEmail : req.cookies.email,
      voterKey : req.cookies.voter,
      adminKey : req.params.akey
    }
    res.render("success_newpoll", userData);
  });

  router.get("/v/:vkey", (req, res) => {
    const visitorKey = req.params.vkey;
    queryHelpers.selectChoicesTable(visitorKey, (choiceResult) => {
      queryHelpers.selectPollsTable(visitorKey, (pollResult) => {
        res.render('poll_voter', {choiceResult, pollResult})
      });
    });
  });

  router.get("/v/:vkey/success", (req, res) => {
    res.render("success_votepoll");
  });

  router.get("/v/:vkey/error", (req, res) => {
    res.render("already_voted");
  });

  router.get("/all/", (req, res) => {
    queryHelpers.getAllPolls((allPolls) => {
      res.json(allPolls);
    });
  });

  router.post("/v/:vkey", (req, res) => {
    const voteResult = req.body.voteResult;
    const voterName = req.body.voterName;

    queryHelpers.insertVotersTable(voterName, (voter_id) => {
      voteResult.forEach((choiceId, index) => {
        const choiceIdNum = Number(choiceId);
        queryHelpers.insertResultsTable(choiceIdNum, index, voter_id, () => {
          // res.send("vote submitted");
        });
      });
    });
  });

  return router;
}
