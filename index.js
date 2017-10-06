var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect('mongodb://andrey484:qwerty1234567@ds137464.mlab.com:37464/sunny_project');
mongoose.connect('mongodb://localhost/test');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var getAllGames = require('./route/getAllGames')
var getTeam = require('./route/getTeam')
var getUserById = require('./route/getUserById')


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use('/getAllGames', getAllGames);
app.use('/getTeam', getTeam);
app.use('/getUserById', getUserById);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.post('/asd', function (request, response) {
//     response.send("asd")
// });


server.listen(app.get('port'), function (err) {
    if (err)
        console.log(err);
    console.log('Node app is running on port', app.get('port'));
});

module.exports = server;