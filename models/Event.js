var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    sport: { type: String },
    venue: { type: String },
    numberOfPlayers: { type: Number },
    privacy: { type: String },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    type: { type: String }
},{
  timestamps: true
});

eventSchema.index({'sport': 'text', 'venue': 'text', 'players': 'text', 'type': 'text'}, {weights: {sport: 4, venue: 4, players: 4, type: 4}});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
