var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  name: { type: String },
  bio: { type: String },
  username: { type: String },
  isVerified: { type: Boolean, default: false },
  email: { type: String },
  location: { type: String },
  birthDate: { type: String },
  equipment: { type: String },
  gender: { type: String },
  achievements: { type: String },
  teams: { type: String }
},{
  timestamps: true
});

userSchema.index({'name': 'text', 'bio': 'text', 'email': 'text', 'location': 'text', 'teams': 'text', 'equipment': 'text'}, {weights: {name: 4, bio: 4, email: 4, location: 4, teams: 4, equipment: 4}});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;
