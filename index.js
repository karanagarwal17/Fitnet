const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const favicon = require('serve-favicon')
const fs = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');

require('dotenv').config();
const routes = require('./routes');

// Securing connection to DB
var url = process.env.mongoUrl;

mongoose.Promise = bluebird;
mongoose.connect(url, {
	promiseLibrary: bluebird
})
.then(() => {
	console.log('Connection to MongoDB successful!');
})
.catch(err => {
	console.log('Error in connection to MongoDB');
	console.log(err.stack);
});

// Initialising App
var app = express();
app.use(cors());
app.use(compression());
app.listen(3000);

app.use(passport.initialize());

require('./config/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'production'), {
	maxAge: 0
}));
app.get('*', function(req, res, next){
	if(req.url.includes('.')){
		console.log({err: 'Invalid request for file' + req.url, fileLocation:'./index.js', errLocation: 'app.get * includes(".")'});
		return res.status(404).send('Not Found');
	} else {
		next();
	}
});

app.use(morgan('dev'));

app.use('/api', routes);

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, 'production', 'index.html'));
});

/// +++ Error handlers

// development error handler; will print stacktrace
if (process.env.environment === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500).json({ message: err.message, error: err });
		console.log(err);
	});
} else {
// production error handler; no stacktraces leaked to user <-- Nice :)
	app.use(function(err, req, res, next) {
		res.status(err.status || 500).json({ message: 'Something went wrong!' });
		console.log(err);
	});
}

module.exports = app;
