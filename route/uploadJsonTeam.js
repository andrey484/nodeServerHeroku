const express = require('express')
const router = express();
const Model = require('./../model/model');

router.post('/', (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
        let newTeamModel = new Model.TeamModel({
            id: req.body[i].id,
            gameId: req.body[i].gameId,
            name: req.body[i].name,
            teamPassword: req.body[i].teamPassword,
            countOfPlayers: req.body[i].countOfPlayers,
            progress: req.body[i].progress,
            hintProgress: req.body[i].hintProgress,
            color: req.body[i].color
        });
        newTeamModel.save((err) => {
            if (err) {
                console.log(err);
                res.send(err.message)
            }
            console.log("team " + (i + 1) + " add");
        })
    }
    res.send("done");
});

module.exports = router;