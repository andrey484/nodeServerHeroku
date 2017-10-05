var express = require('express')
var router = express();
var Model = require('./../model/model');

router.post('/', function (req, res) {
    if(
        (typeof req.query.userId === 'undefined' || req.query.userId === null)
    ){
        var error = {"error":"userId undefined or null"}
        res.json(error)
        return;
    }
    Model.UserModel.find({userId: req.query.userId}, function (err, docs) {
        if(err) console.log(err)
        else{
            var json = {
                id: docs[0].id,
                userId: docs[0].userId,
                teamId: docs[0].teamId,
                gameId: docs[0].gameId
            };
            res.send(json);
        }
    })

});

module.exports = router