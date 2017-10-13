const express = require('express');
const router = express.Router();
const Model = require('./../model/model');
const fs = require('fs');

const pathToFile = '/home/andrey/Desktop/mountain-climb-race-2_icon.png';

function to_base_64(file){
    const bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64')
}

router.post('/', function (req, res) {
    const file = to_base_64(pathToFile);
    console.log(file);
    Model.GamesModel.update({gameId: 'gameId2'}, {photoUrl: file}, function (err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('done');
        res.send('done')
    })
});


module.exports = router;