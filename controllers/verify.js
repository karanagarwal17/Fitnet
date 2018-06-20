const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.getToken = function(user) {
  return jwt.sign(user, process.env.secretKey);
};

exports.verifyUser = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if(token){
    jwt.verify(token, process.env.secretKey, function(err, decoded) {
      if(err){
        console.log({err: err, fileLocation: './controllers/verify.js', errLocation: 'verifyUser 1'});
        return res.status(401).json({error: 'Invalid token!'});
      }
      req.userId = decoded._id;
      next();
    });
  } else {
    console.log({err: 'No token Provided!', fileLocation: './controllers/verify.js', errLocation: 'verifyUser 2'});
    return res.status(401).json({error: 'No token provided!'});
  }
};

exports.verifyOwnProfile = function(req, res, next){
  var token = req.headers['x-access-token'];
  if(token){
    jwt.verify(token, process.env.secretKey, function(err, decoded){
      if(err){
        console.log({err: err, fileLocation: './controllers/verify.js', errLocation: 'vefifyOwnProfile 1'});
        return res.status(401).json({error: 'Invalid token!'});
      }
      req.userId = decoded._id;
      User.findOne({username: req.params.username}, function(err, user){
        if(err){
          console.log({err: err, fileLocation: './controllers/verify.js', errLocation: 'vefifyOwnProfile 2'});
          return res.status(401).json({error: 'Error finding your user!'});
        }
        if(!user){
          console.log({err: 'No user found!', fileLocation: './controllers/verify.js', errLocation: 'vefifyOwnProfile 3'});
          return res.status(401).json({error: 'No user found!'});
        }
        if(user._id == req.userId){
          next();
        } else {
          console.log({err: 'You are not authenticated for this action!', fileLocation: './controllers/verify.js', errLocation: 'vefifyOwnProfile 4'});
          return res.status(401).json({error: 'You are not authenticated for this action!'});
        }
      });
    });
  } else {
    console.log({err: 'No token provided!', fileLocation: './controllers/verify.js', errLocation: 'vefifyOwnProfile 5'});
    return res.status(401).json({error: 'No token provided!'});
  }
}
