const express = require('express');
const router = express.Router();
const Model = require('./../model/model');
const fs = require('fs')

const pathToFile = '/home/andrey/Desktop/analys_pee.jpg'

router.post('/', function (req, res) {
    const file = fs.readFileSync(pathToFile)

    Model.GamesModel.find({gameId: 'gameId1'}, (err, docs) =>{
       if(err){
           console.log(err);
           return;
       }
       console.log('debug')
    });
    Model.GamesModel.update({gameId: 'gameId1'}, {photoUrl: file}, function (err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('done');
        res.send('done')
    })
});


module.exports = router;