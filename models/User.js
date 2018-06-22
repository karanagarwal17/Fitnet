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

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;
