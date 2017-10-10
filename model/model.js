const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
    gameId: String,
    name: String,
    description: String,
    backgroundUrl: String,
    photoUrl: String,
    countOfTeams: Number,
    task: [Schema.Types.Mixed]
});

const teamSchema = new Schema({
    id: String,
    gameId: String,
    name: String,
    teamPassword: String,
    countOfPlayers: Number,
    progress: Number,
    hintProgress: Number,
    time: Number
});

const userSchema = new Schema({
    userId: String,
    teamId: String,
    gameId: String
});

const hintSchema = new Schema({
    teamId: String,
    type: Number,
    text: String
});

module.exports.GamesModel = mongoose.model('games', gamesSchema);
module.exports.GamesSchema = gamesSchema;

module.exports.TeamModel = mongoose.model('team', teamSchema);
module.exports.TeamSchema = teamSchema;

module.exports.UserModel = mongoose.model('user', userSchema);
module.exports.UserSchema = userSchema;

module.exports.HintModel = mongoose.model('hints', hintSchema);
module.exports.HintSchema = hintSchema;