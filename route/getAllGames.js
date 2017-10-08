const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Model = require('./../model/model');


router.post('/', function (req, res) {
    Model.GamesModel.find({}, function (err, docs) {
        if (err) res.send(err)
        else {
            res.send(docs)
        }
    })
});


module.exports = router;