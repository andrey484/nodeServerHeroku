const express = require('express');
const router = express.Router();
const Model = require('./../model/model');


router.get('/', function (req, res) {
    if (typeof req.query.gameId === undefined || req.query.gameId === null) {
        let error = {'error': 'gameId undefined or null'}
        res.send(error);
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
        let data = [];

        for(let i = 0; i < docs.length; i++) {
            data.push(docs[i]);
        }
        if (req.session.state)
            res.send(data)
    })
});

module.exports = router;