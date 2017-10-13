const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Model = require('./model/model');
const Schema = mongoose.Schema;
//mongoose.connect('mongodb://andrey484:qwerty1234567@ds137464.mlab.com:37464/sunny_project');
mongoose.connect('mongodb://localhost/test');
const server = require('http').createServer(app);
const SocketServer = require('ws');
const wss = new SocketServer.Server({server});
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const getAllGames = require('./route/getAllGames');
const getTeam = require('./route/getTeam');
const getUserById = require('./route/getUserById');
const getTeamByGameId = require('./route/getAllTeamsByGameId');
const getHintByTeamId = require('./route/getHintByTeamId');
const uploadPicture = require('./route/uploadPicture');
const createNewHint = require('./route/createHint')


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use('/getAllGames', getAllGames);
app.use('/getTeam', getTeam);
app.use('/getUserById', getUserById);
app.use('/getTeamByGameId', getTeamByGameId);
app.use('/getHintByTeamId', getHintByTeamId);
app.use('/uploadPicture', uploadPicture);
app.use('/createNewHint', createNewHint);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


server.listen(app.get('port'), function (err) {
    if (err)
        console.log(err);
    console.log('Node app is running on port', app.get('port'));
});


wss.on('connection', function (ws) {
    console.log("connect to socket");
    ws.on('message', function (data) {
        switch (JSON.parse(data).cmd) {
            case 10: {
                let currentProgress = 0;
                Model.TeamModel.find({id: JSON.parse(data).teamId}, function (err, docs) {
                    if (docs.length == 0) {
                        ws.send('cant find team wits id');
                        return;
                    }
                    currentProgress = docs[0].progress;
                    currentProgress++;
                    Model.TeamModel.update({id: JSON.parse(data).teamId}, {progress: currentProgress}, function (err) {
                        if (err) console.log(err);
                        let json = {"cmd": 10};
                        wss.clients.forEach((client) =>{
                            client.send(JSON.stringify(json));
                        })
                    });
                });
                break;
            }
            case 20: {
                let newHint = new Model.HintModel({
                    teamId: JSON.parse(data).teamId,
                    type: 4,
                    text: JSON.parse(data).text
                });
                newHint.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    let json = {
                        "cmd": 20,
                        "teamId": JSON.parse(data).teamId
                    };
                    wss.clients.forEach((client) =>{
                        client.send(JSON.stringify(json));
                    });
                });

                break;
            }
            case 25:{

                break;
            }
            case 30: {
                Model.TeamModel.update({id: JSON.parse(data).teamId}, {time: JSON.parse(data).time}, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    let json = {
                        "cmd": 30,
                        "teamId": JSON.parse(data).teamId
                    };
                    wss.clients.forEach((client) =>{
                        client.send(JSON.stringify(json));
                    });
                });
                break;
            }
            case 40: {
                Model.TeamModel.find({id: JSON.parse(data).teamId}, function (err, docs) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (docs.length == 0) {
                        ws.send('cant find team wits id');
                        return;
                    }
                    let json = {
                        "cmd": 40,
                        "teamId": JSON.parse(data).teamId,
                        "time": docs[0].time
                    };
                    wss.clients.forEach((client) =>{
                        client.send(JSON.stringify(json));
                    });
                });
                break;
            }
            case 50:{
                Model.TeamModel.update({id: JSON.parse(data).teamId}, {hintProgress: JSON.parse(data).hintProgress}, function (err) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    let json = {
                        "cmd": 50,
                        "teamId": JSON.parse(data).teamId
                    };
                    wss.clients.forEach((client) =>{
                        client.send(JSON.stringify(json));
                    })
                });
                break;
            }
            case 60:{
                Model.GamesModel.update({gameId: JSON.parse(data).gameId}, {isStart: JSON.parse(data).isStart}, function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    wss.clients.forEach((client) =>{
                        client.send(JSON.stringify({"cmd": 60}));
                    });
                });
                break;
            }
            default: {
                ws.send({error: "undefined command"}.toString())
            }
        }
    });
    ws.on('close', () => console.log('Client disconnected'));
});

setInterval(()=>{
    wss.clients.forEach((client) =>{
        client.send(new Date().toTimeString())
    })
}, 10000);




module.exports = server;