const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../models/User');

const username_generator = require('../services/username_generator');
const verify = require('../controllers/verify');

const router = express.Router();

router.route('/')
	.get(function(req, res, next){
		User.find({}, function(err, players){
			if(err){
				console.log(err);
				return res.status(501).json({ error: err });
			}
			res.status(200).json({ players: players });
		});
	});

router.route('/current')
	.get( verify.verifyUser, function(req, res, next) {
		User.findOne({"_id": req.userId})
		.select('imageUrl name username')
		.exec(function(err, user){
			if(err) {
				console.log({err: err, fileLocation: './routes/user.js', errLocation: 'get on /current 1'});
				return res.status(401).json({error: err});
			}
			if(!user){
				console.log({err: 'No user found', fileLocation:'./routes/user.js', errLocation: 'get on /current 2'});
				return res.status(401).json({error: 'No user found'});
			}
			res.status(200).json({user: user});
		});
	});

router.route('/:username')
	.get(function(req, res, next) {
		User.findOne({'username': req.params.username})
		.exec(function(err, user) {
			if (err) {
				console.log({err: err, fileLocation: './routes/user.js', errLocation: 'get on /:username 1'});
				return res.status(401).json({error: err});
			}
			if(!user){
				console.log({err: 'No user found', fileLocation:'./routes/user.js', errLocation: 'get on /:username 2'});
				return res.status(401).json({error: 'No user found'});
			}
			res.status(200).json({user: user});
		});
	})
	.put(verify.verifyOwnProfile, function(req, res, next) {
		User.findOneAndUpdate({"username": req.params.username}, { $set: req.body }, { new: true })
		.exec(function(err, user) {
			if (err) {
				console.log({err: err, fileLocation: './routes/user.js', errLocation: 'put on /:username 1'});
				return res.status(401).json({error: err});
			}
			if(!user){
				console.log({err: 'No user found', fileLocation:'./routes/user.js', errLocation: 'put on /:username 2'});
				return res.status(401).json({error: 'No user found'});
			}
			res.status(200).json({user: user});
		});
	});
	
router.post('/register', function(req, res, next){
	User.register(new User({ email : req.body.email }),
	req.body.password, function(err, user) {
		if (err) {
			console.log({err: err, fileLocation: './routes/user.js', errLocation: 'post on /register 1'});
			return res.status(401).json({error: 'Cannot register a user with the given email!'});
		}
		user.name = req.body.name;
		user.isVerified = true;
		username_generator(req.body.name, function(username){
			user.username = username;
			user.save(function(err, new_user){
				if(err){
					console.log({err: err, fileLocation: './routes/user.js', errLocation: 'post on /register 2'});
					return res.status(401).json({error: 'Internal Error, kindly retry!'});
				}
				res.status(200).json({success: true, message: 'Your account has been created'});
			});
		});
	});
});

router.post('/login', function(req, res, next){
	passport.authenticate('local', { session: false }, function (err, user, info) {
		if(err){
			console.log({err: err, fileLocation: './routes/user.js', errLocation: 'post on /login 1'});
            return res.status(401).json({ error: 'Authenticaion error!'});
		}
		if(!user){
			if(info.name == 'IncorrectUsernameError'){
				console.log({err: 'Wrong Password', fileLocation: './routes/user.js', errLocation: 'post on /login 2'});
				return res.status(401).json({error: 'The email you entered is not correct'});
			} else {
				console.log({err: 'Wrong Password', fileLocation: './routes/user.js', errLocation: 'post on /login 3'});
				return res.status(401).json({error: 'The password you entered is not correct'});
			}
		}
		if(!user.isVerified){
			console.log({err: 'User not verified', fileLocation: './routes/user.js', errLocation: 'post on /login 4'});
			return res.status(401).json({error: 'You aren\'t verified, Please check for Verification mail in your email.'});
		}
		var token = verify.getToken({_id: user._id, name: user.name, username: user.username, createdAt: user.createdAt, updatedAt: user.updatedAt});
		res.status(200).json({ token: token, user: user });
	})(req, res, next);
});

module.exports = router;