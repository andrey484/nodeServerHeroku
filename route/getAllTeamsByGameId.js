const express = require('express');
const router = express.Router();
const Model = require('./../model/model');


router.get('/', function (req, res) {
    if (typeof req.query.gameId === undefined || req.query.gameId === null) {
        let error = {'error': 'gameId undefined or null'}
        res.json(error);
        return;
    }
    Model.TeamModel.find({id: req.query.gameId}, function (err, docs) {
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
        res.json(data)
    })
});

module.exports = router;