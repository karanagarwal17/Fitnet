var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
    name: { type: String },
    address: { type: String },
    sports: [{ type: String }]
},{
  timestamps: true
});

venueSchema.index({'name': 'text', 'address': 'text', 'sports': 'text'}, {weights: {name: 4, address: 4, sports: 4}});

var Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
