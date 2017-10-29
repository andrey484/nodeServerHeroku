const express = require('express')
const router = express();
const Model = require('./../model/model');

router.post('/', function (req, res) {
    try {
        let newGameModel = new Model.GamesModel({
            gameId: req.body.GameId,
            name: req.body.Name,
            description: req.body.Description,
            backgroundUrl: req.body.BackgroundUrl,
            photoUrl: req.body.PhotoUrl,
            countOfTeams: req.body.CountOfTeams,
            isStart: req.body.IsStart,
            //timeForAllGame: req.body.TimeToGame,
            task: req.body.Task
        });
    }catch (ex) {
        console.log(ex.toString());
    }
    newGameModel.save((err) => {
        if (err)
            console.log(err.message);
        res.send("done");
        console.log("new game added")
    });
    console.log("done");
});

module.exports = router;
