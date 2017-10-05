var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Model = require('./../model/model');


router.post('/', function (req, res) {
    Model.GamesModel.find({}, function (err, docs) {
        if (err) res.send(err)
        else {
            res.send(docs)
        }
    })
});


module.exports = router;