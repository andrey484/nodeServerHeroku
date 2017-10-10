const express = require('express')
const router = express();
const Model = require('./../model/model');

router.post('/', function (req, res) {
    if (
        (typeof req.query.name === 'undefined' || req.query.name === null) ||
        (typeof req.query.pass === 'undefined' || req.query.pass === null) ||
        (typeof req.query.gameId === 'undefined' || req.query.gameId === null) ||
        (typeof req.query.userId === 'undefined' || req.query.userId === null)
    ) {
        const error = {"error": "name or pass undefined or null"};
        res.json(error);
        return;
    }
    Model.TeamModel.find({
        gameId: req.query.gameId,
        name: req.query.name,
        teamPassword: req.query.pass
    }, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        if (docs[0] === 'undefined' || docs[0] === null) {
            res.send({"error": "wrong name or password"})
        } else {
            Model.UserModel.find({userId: req.query.userId}, function (err, userDocs) {
                if (docs.length > 0) {
                    if (userDocs.length == 0) {
                        let user = new Model.UserModel({
                            userId: req.query.userId,
                            teamId: docs[0].id,
                            gameId: req.query.gameId
                        });
                        user.save(function (err) {
                            if (err) console.log(err)
                        });
                        let jsonTmp = {
                            id: docs[0].id,
                            gameId: docs[0].gameId,
                            name: docs[0].name,
                            teamPassword: docs[0].teamPassword,
                            countOfPlayers: docs[0].countOfPlayers,
                        };
                        res.json(jsonTmp);
                        res.send({'succes': "creqte new user"})
                    } else {
                        Model.UserModel.update({userId: req.query.userId}, {
                            userId: req.query.userId,
                            teamId: docs[0].id,
                            gameId: req.query.gameId
                        }, function (err) {
                            if (err)
                                console.log(err);
                            else {
                                res.send('succes')
                            }
                        });
                        let json = {
                            id: docs[0].id,
                            gameId: docs[0].gameId,
                            name: docs[0].name,
                            teamPassword: docs[0].teamPassword,
                            countOfPlayers: docs[0].countOfPlayers,
                        };
                        res.json(json);
                    }
                }else{
                    res.send({'error': "some of parameters is undefined"})
                }
            })
        }

    })
});

module.exports = router;