var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Model = require('./../model/model');


router.post('/', function (req, res) {
    var game1 = new Model.GamesModel({
            gameId: "gameID2",
            name: "test",
            description: "fdfddfd",
            backgroundUrl: "game1backgroung.png",
            photoUrl: "/game1.png",
            countOfTeams: "4",
            task: [{
                name: "task1",
                answer: "answer1",
                borders: 90,
                hint: [
                    {
                        videoUrl: null,
                        photoUrl: "/game1task1h1.png",
                        flashUrl: "null",
                        text: "пойти в магазин",
                        time: 60000
                    },
                    {
                        videoUrl: null,
                        photoUrl: "/game1task1h2.png",
                        flashUrl: "null",
                        text: "пойти домой",
                        time: 30000
                    }
                ]
            }, {
                name: "task2",
                answer: "answer2",
                borders: 90,
                hint: [
                    {
                        videoUrl: null,
                        photoUrl: "/game1task2h1.png",
                        flashUrl: "null",
                        text: "пойти в магазин продуктов",
                        time: 60000
                    },
                    {
                        videoUrl: null,
                        photoUrl: "/game1task2h2.png",
                        flashUrl: "null",
                        text: "пойти к другу",
                        time: 30000
                    }
                ]
            }
            ]
        });


    var game2 = new Model.GamesModel({
        gameId: "gameID2",
        name: "test2",
        description: "fdfddsdffd",
        backgroundUrl: "game2backgroung.png",
        photoUrl: "/game2.png",
        countOfTeams: "4",
        task: [{
            name: "task1",
            answer: "answer2",
            borders: 90,
            hint: [
                {
                    videoUrl: null,
                    photoUrl: "/game2task1h1.png",
                    flashUrl: "null",
                    text: "пойти на склад",
                    time: 60000
                },
                {
                    videoUrl: null,
                    photoUrl: "/game2task1h2.png",
                    flashUrl: "null",
                    text: "пойти в гости",
                    time: 30000
                }
            ]
        }, {
            name: "task2",
            answer: "a2",
            borders: 90,
            hint: [
                {
                    videoUrl: null,
                    photoUrl: "/game2task2h1.png",
                    flashUrl: "null",
                    text: "пойти в магазин рыбы",
                    time: 60000
                },
                {
                    videoUrl: null,
                    photoUrl: "/game1task2h2.png",
                    flashUrl: "null",
                    text: "пойти к подруге",
                    time: 30000
                }
            ]
        }
        ]
    });
    game1.save(function (err) {if(err) console.log(err)})
    game2.save(function (err) {if(err) console.log(err)})

    var team1 = new Model.TeamModel({
        id: "id1",
        gameId: "gameId1",
        name: "power",
        teamPassword: "passw1",
        countOfPlayers: 4,
        progress: 2,
        hintProgress: 5
    });
    var team2 = new Model.TeamModel({
        id: "id2",
        gameId: "gameId2",
        name: "power2",
        teamPassword: "passw2",
        countOfPlayers: 4,
        progress: 3,
        hintProgress: 5
    });
    var team3 = new Model.TeamModel({
        id: "id3",
        gameId: "gameId3",
        name: "power3",
        teamPassword: "passw3",
        countOfPlayers: 5,
        progress: 5,
        hintProgress: 2
    });
    var team4 = new Model.TeamModel({
        id: "id4",
        gameId: "gameId4",
        name: "power4",
        teamPassword: "passw4",
        countOfPlayers: 3,
        progress: 5,
        hintProgress: 5
    });
    var team5 = new Model.TeamModel({
        id: "id5",
        gameId: "gameId5",
        name: "power5",
        teamPassword: "passw5",
        countOfPlayers: 4,
        progress: 4,
        hintProgress: 5
    });
    var team6 = new Model.TeamModel({
        id: "id6",
        gameId: "gameId6",
        name: "power6",
        teamPassword: "passw6",
        countOfPlayers: 3,
        progress: 2,
        hintProgress: 5
    });
    var team7 = new Model.TeamModel({
        id: "id7",
        gameId: "gameId7",
        name: "power7",
        teamPassword: "passw7",
        countOfPlayers: 4,
        progress: 2,
        hintProgress: 5
    });
    var team8 = new Model.TeamModel({
        id: "id8",
        gameId: "gameId8",
        name: "power8",
        teamPassword: "passw8",
        countOfPlayers: 5,
        progress: 6,
        hintProgress: 4
    });

    team1.save(function (err) {if(err) console.log(err)})
    team2.save(function (err) {if(err) console.log(err)})
    team3.save(function (err) {if(err) console.log(err)})
    team4.save(function (err) {if(err) console.log(err)})
    team5.save(function (err) {if(err) console.log(err)})
    team6.save(function (err) {if(err) console.log(err)})
    team7.save(function (err) {if(err) console.log(err)})
    team8.save(function (err) {if(err) console.log(err)})
    // Model.GamesModel.find({}, function (err, docs) {
    //     if (err) res.send(err)
    //     else {
    //         res.send(docs)
    //     }
    // })

    var user = new Model.UserModel({
        id: "asdfg",
        userId: "sdf32",
        teamId: "sdf323",
        gameId: "sdfsf3"
    });
    user.save(function (err) {
        if(err) console.log(err)
    })
});


module.exports = router;