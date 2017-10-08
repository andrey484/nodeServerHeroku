const express = require('express');
const router = express.Router();
const Model = require('./../model/model');


router.post('/', function (res, req) {
    if (typeof req.query.gameId === undefined || req.query.gameId === null) {
        let error = {'error': 'gameId undefined or null'}
        res.json(error);
        return;
    }
    Model.TeamModel.find({gameId: req.query.gameId}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        if (docs.length == 0) {
            res.json({'error': 'team with current gameId not found'})
            return;
        }
        const json = {
            id: docs[0].id,
            gameId: docs[0].gameId,
            name: docs[0].name,
            teamPassword: docs[0].teamPassword,
            countOfPlayers: docs[0].countOfPlayers,
            progress: docs[0].progress,
            hintProgress: docs[0].hintProgress
        };
        res.json(json);
    })
});

module.exports = router;