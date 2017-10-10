const express = require('express');
const router = express.Router();
const Model = require('./../model/model');

router.get('/', function (req, res) {
    if (typeof req.query.teamId === undefined || req.query.teamId === null) {
        let error = {'error': 'gameId undefined or null'};
        res.json(error);
        return;
    }
    Model.HintModel.find({teamId: req.query.teamId}, function (err, body) {
        if(err){
            console.log(err)
            res.send('no hint in this team');
            return;
        }
        if (body.length == 0) {
            res.json({'error': 'team with current gameId not found'})
            return;
        }
        let data = [];

        for(let i = 0; i < body.length; i++) {
            data.push(body[i]);
        }
        res.json(data)
    })
});

module.exports = router;