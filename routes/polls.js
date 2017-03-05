const express = require('express');
const router  = express.Router();

module.exports = (queryHelpers, mailgun) => {

  //All routes that prefixes with /polls/ go here
  router.get("/a/:akey", (req, res) => {
    const adminKey = req.params.akey;
    queryHelpers.selectPollsTableAdminKey(adminKey, (resultTitle) => {
      queryHelpers.getRanks(adminKey, (resultRanks) => {
        let winner = resultRanks[0].title;
        for (let i = 0; i < resultRanks.length - 1; i++) {
          if (resultRanks[i].sum < resultRanks[i + 1].sum) {
            winner = resultRanks[i + 1].title;
          }
        }
        queryHelpers.getVoter(adminKey, (resultVoter) => {
          res.render("poll_admin", {resultTitle, winner, resultVoter});
        })
      });
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
    const poll_id = req.body.poll_id;

    queryHelpers. selectUsersTableByPollId(poll_id, (userData) => {
      mailgun.sendAdminResults(userData.email);
    });

      queryHelpers.insertVotersTable(voterName, poll_id, (voter_id) => {
        voteResult.forEach((choiceId, index) => {
          const choiceIdNum = Number(choiceId);
          queryHelpers.insertResultsTable(choiceIdNum, index, voter_id, () => {
              res.end("vote submitted");
          });
        });
      });
    });
  return router;
}
