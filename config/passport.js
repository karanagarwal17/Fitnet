const localStrategy = require('passport-local').Strategy;
const passport = require('passport');

const User = require('../models/User');

passport.use(User.createStrategy());