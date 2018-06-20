var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    sport: { type: String },
    venue: { type: Object },
    numberOfPeople: { type: Number },
    privacy: { type: String },
    players: { type: Object }
},{
  timestamps: true
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
