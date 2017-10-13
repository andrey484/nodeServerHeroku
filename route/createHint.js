const express = require('express');
const router = express.Router();
const Model = require('./../model/model');

router.post('/', function (req, res) {
    if (
        (typeof req.query.teamId === undefined || req.query.teamId === null) ||
        (typeof req.query.type === undefined || req.query.type === null) ||
        (typeof req.query.text === undefined || req.query.text === null)) {
        let error = {'error': 'teamId or type or text undefined or null'}
        res.json(error);
        return;
    }

    const newHint = new Model.HintModel({
        teamId: req.query.teamId,
        type: req.query.type,
        text: req.query.text
    });
    newHint.save(function (err) {
        if (err)
            console.log(err);
    });
    res.send('done');
});

module.exports = router;