var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
    name: { type: String },
    address: { type: String },
    sports: [{ type: String }]
},{
  timestamps: true
});

var Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
