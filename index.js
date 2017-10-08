const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Model = require('./model/model');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://andrey484:qwerty1234567@ds137464.mlab.com:37464/sunny_project');
//mongoose.connect('mongodb://localhost/test');
const server = require('http').createServer(app);
const SocketServer = require('ws');
const wss = new SocketServer.Server({server});
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const getAllGames = require('./route/getAllGames');
const getTeam = require('./route/getTeam');
const getUserById = require('./route/getUserById');


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use('/getAllGames', getAllGames);
app.use('/getTeam', getTeam);
app.use('/getUserById', getUserById);

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
    ws.on('message', function (data) {
        switch (JSON.parse(data).cmd) {
            case 10: {
                let currentProgress = 0;
                Model.TeamModel.find({id: JSON.parse(data).teamId}, function (err, docs) {
                    if(docs.length == 0) ws.send('cant find team wits id')
                    currentProgress = docs[0].progress;
                    currentProgress++;
                    Model.TeamModel.update({id: JSON.parse(data).teamId}, {progress: currentProgress}, function (err) {
                        if(err) console.log(err);
                        ws.send('{"cmd":10}');
                    });
                });
                // setInterval(() => {
                //     wss.clients.forEach((client) => {
                //         client.send(new Date().toTimeString());
                //     });
                // }, 1000);
                break;
            }
            case 20:{

                break;
            }
            case 30:{

                break;
            }
            case 40:{

                break;
            }
            default:{
                ws.send('{error: "undefined command"}')
            }
        }
    })
});

module.exports = server;