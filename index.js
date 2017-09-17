var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://andrey484:qwerty1234567@ds137464.mlab.com:37464/sunny_project');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var Cat = mongoose.model('Cat', {
    name: String
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.post('/asd', function (request, response) {
    Cat.find({'name': 'pusya'}, function (err, docs) {
        if (err)
            console.log(err);
        else {
            console.log('done query');
            response.send(docs[0]._doc.name)
        }
    })
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});