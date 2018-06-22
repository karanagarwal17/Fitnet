const router = require('express').Router();

const Venue = require('../models/Venue');

router.route('/')
    .get(function(req, res, next){
        Venue.find({}, function(err, venues){
            if(err){
                console.log(err);
                return res.status(501).json({ error: err });
            }
            res.status(200).json({ venues: venues });
        });
    })
    .post(function(res, res, next){
        Venue.create(req.body, function(err, venue){
            if(err){
                console.log(err);
                return res.status(501).json({ error: err });
            }
            res.status(200).json({ success: true });
        });
    });

module.exports = router;