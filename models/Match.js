var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    sport: { type: String },
    venue: { type: Object },
    numberOfPeople: { type: Number },
    privacy: { type: String },
    players: { type: Object }
},{
  timestamps: true
});

var Match = mongoose.model('Match', matchSchema);

module.exports = Match;
