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
    let data = [];
    let flag = false;
    Model.HintModel.find({teamId: req.query.teamId}, function (err, docs) {
        if (err)
            console.log(err)
        if (docs.length == 0) {
            newHint.save(function (err) {
                if (err)
                    console.log(err);
            });
            res.send('done');
            return;
        }

        for (let i = 0; i < docs.length; i++) {
            data.push(docs[i])
        }
        for(let i = 0; i < data.length;i++){
            if (data[i].text == req.query.text) {
                res.json({'error': 'hint already exist'})
                return;
            }
            else {
                flag = true;
            }
        }
        if(flag){
            newHint.save(function (err) {
                if (err)
                    console.log(err);
            });
            res.send('done');
        }
    });

});


module.exports = router;