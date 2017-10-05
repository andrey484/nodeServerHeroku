var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var gamesSchema = new Schema({
    gameId: String,
    name: String,
    description: String,
    backgroundUrl: String,
    photoUrl: String,
    countOfTeams: Number,
    task: [Schema.Types.Mixed]
});

var teamSchema = new Schema({
    id: String,
    gameId: String,
    name: String,
    teamPassword: String,
    countOfPlayers: Number,
    progress: Number,
    hintProgress: Number
});

var userSchema = new Schema({
    userId: String,
    teamId: String,
    gameId: String
});


module.exports.GamesModel = mongoose.model('games', gamesSchema);
module.exports.GamesSchema = gamesSchema;

module.exports.TeamModel = mongoose.model('team', teamSchema);
module.exports.TeamSchema = teamSchema;

module.exports.UserModel = mongoose.model('user', userSchema);
module.exports.UserSchema = userSchema;